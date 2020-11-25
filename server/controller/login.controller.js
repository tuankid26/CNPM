var db = require('../db')
module.exports.login = function(req, res){
    var username = req.body.name;
    var password = req.body.pass;
    console.log(username);
    console.log(password);
    // Select from database, user_account
    console.log('SELECT * FROM USER_ACCOUNT WHERE USER_NAME LIKE N' + '\'' + username + '\'');
    // querry user_account
    db.executeQuery('SELECT * FROM USER_ACCOUNT WHERE USER_NAME LIKE' + '\'' + username + '\'', function(data, err){
        if (err){
            console.log('error');
            res.send(err);
            return;
        }
        if (!data.length){
            res.render('../views/login', {
                errors: ['User does not exist']
            });
            return;
        }
        // Check correct passwork
        if (data[0].PASSWORD !== password){
            res.render('../views/login', {
                errors: ['Incorrect password']
            });
            return;
        }
        res.redirect('/feedbacks/');
    });

}
/*
const {
  reorderSteps,
  createStepFile,
  getExistingStepNums,
  getProjectPath,
  getArgValues
} = require('./utils');

const anyStepExists = (steps, stepsToFind) =>
  stepsToFind.some(num => steps.includes(num));

const projectPath = getProjectPath();
const args = getArgValues(process.argv);

let { num, start } = args;
if (!start) {
  throw `No steps created. start arg val must be specified.`;
}
if (!num) {
  throw `No steps created. num arg val must be specified.`;
}
num = parseInt(num, 10);
const stepStart = parseInt(start, 10);

if (num < 1 || num > 20) {
  throw `No steps created. arg 'num' must be between 1 and 20 inclusive`;
}

const maxStepNum = stepStart + num - 1;

const existingSteps = getExistingStepNums(projectPath);

if (anyStepExists(existingSteps, [start, maxStepNum])) {
  throw `Step not created. At least one of the steps specified between ${start} and ${maxStepNum} already exists.`;
}

for (let stepNum = stepStart; stepNum <= maxStepNum; stepNum++) {
  createStepFile({ stepNum, projectPath });
}
console.log(`Sucessfully added ${num} steps`);
reorderSteps();


const {
  reorderSteps,
  createStepFile,
  getChallengeSeed,
  padWithLeadingZeros,
  getExistingStepNums,
  getProjectPath,
  getArgValues
} = require('./utils');

const allStepsExist = (steps, stepsToFind) =>
  stepsToFind.every(num => steps.includes(num));

const projectPath = getProjectPath();
const args = getArgValues(process.argv);

let { start, end } = args;
start = parseInt(start, 10);
end = parseInt(end, 10);

if (
  !Number.isInteger(start) ||
  !Number.isInteger(end) ||
  start < 1 ||
  start !== end - 1
) {
  throw 'Step not created. Steps specified must be' +
    ' consecutive numbers and start step must be greater than 0.';
}

const existingSteps = getExistingStepNums(projectPath);
if (!allStepsExist(existingSteps, [start, end])) {
  throw 'Step not created. At least one of the steps specified does not exist.';
}

const challengeSeed = getChallengeSeed(
  `${projectPath}part-${padWithLeadingZeros(start)}.md`
);
createStepFile({
  stepNum: start,
  projectPath,
  challengeSeed,
  stepBetween: true
});
console.log(`Sucessfully added step between step #${start} and step #${end}`);
reorderSteps();



const config = require('../config');

const fetch = require('node-fetch');

const { getPRs, getUserInput, getFiles } = require('../lib/get-prs');
const { addLabels, addComment } = require('../lib/pr-tasks');
const { rateLimiter, ProcessingLog } = require('../lib/utils');
const {
  frontmatterCheck
} = require('../lib/validation/guide-folder-checks/frontmatter-check');
const {
  createErrorMsg
} = require('../lib/validation/guide-folder-checks/create-error-msg');

const allowedLangDirNames = [
  'arabic',
  'chinese',
  'english',
  'portuguese',
  'russian',
  'spanish'
];

const log = new ProcessingLog('all-frontmatter-checks');

const labeler = async(
  number,
  prFiles,
  currentLabels,
  guideFolderErrorsComment
) => {
  // holds potential labels to add based on file path
  const labelsToAdd = {};
  if (guideFolderErrorsComment) {
    labelsToAdd['status: needs update'] = 1;
  }
  const existingLabels = currentLabels.map(({ name }) => name);

  const newLabels = Object.keys(labelsToAdd).filter(label => {
    return !existingLabels.includes(label);
  });
  if (newLabels.length) {
    if (config.oneoff.productionRun) {
      addLabels(number, newLabels);
      await rateLimiter();
    }
  }
  return newLabels;
};

const checkPath = (fullPath, fileContent) => {
  let errorMsgs = [];
  const remaining = fullPath.split('/');
  const isTranslation =
    allowedLangDirNames.includes(remaining[1]) && remaining[1] !== 'english';
  const frontMatterErrMsgs = frontmatterCheck(
    fullPath,
    isTranslation,
    fileContent
  );
  return errorMsgs.concat(frontMatterErrMsgs);
};

const guideFolderChecks = async(number, prFiles, user) => {
  let prErrors = [];
  for (let { filename: fullPath, raw_url: fileUrl } of prFiles) {
    let newErrors;
    if ((/^guide\//).test(fullPath)) {
      const response = await fetch(fileUrl);
      const fileContent = await response.text();
      newErrors = checkPath(fullPath, fileContent);
    }
    if (newErrors) {
      prErrors = prErrors.concat(newErrors);
    }
  }

  if (prErrors.length) {
    const comment = createErrorMsg(prErrors, user);
    if (config.oneoff.productionRun) {
      await addComment(number, comment);
      await rateLimiter();
    }
    return comment;
  } else {
    return null;
  }
};

(async() => {
  const { totalPRs, firstPR, lastPR } = await getUserInput();
  const prPropsToGet = ['number', 'labels', 'user'];
  const { openPRs } = await getPRs(totalPRs, firstPR, lastPR, prPropsToGet);

  log.start();
  console.log('Starting frontmatter checks process...');
  let count = 0;
  for (let i = 0; i < openPRs.length; i++) {
    if (openPRs.length) {
      let {
        number,
        labels: currentLabels,
        user: { login: username }
      } = openPRs[count];
      
      const prFiles = await getFiles(number);
      if (count > 4000) {
        await rateLimiter(2350);
      }
      const guideFolderErrorsComment = await guideFolderChecks(
        number,
        prFiles,
        username
      );
      const commentLogVal = guideFolderErrorsComment
        ? guideFolderErrorsComment
        : 'none';

      const labelsAdded = await labeler(
        number,
        prFiles,
        currentLabels,
        guideFolderErrorsComment
      );
      const labelLogVal = labelsAdded.length ? labelsAdded : 'none added';

      log.add(number, { number, comment: commentLogVal, labels: labelLogVal });
    }
  }
})()
  .then(() => {
    log.finish();
    console.log('Successfully completed frontmatter checks');
  })
  .catch(err => {
    log.finish();
    console.log(err);
  });

const config = require('../config');
const { closeOpen } = require('../lib/pr-tasks');
const { openJSONFile, ProcessingLog, rateLimiter } = require('../lib/utils');

const log = new ProcessingLog('prs-closed-reopened');

log.start();
const getUserInput = async () => {
  let filename = process.argv[2];

  if (!filename) {
    throw 'Specify a file with PRs which needed to be closed and reopened.';
  }

  let fileObj = openJSONFile(filename);
  let { prs } = fileObj;
  if (!prs.length) {
    throw 'Either no PRs found in file or there or an error occurred.';
  }
  return { prs };
};

(async () => {
  const { prs } = await getUserInput();
  return prs;
})()
  .then(async prs => {
    for (let { number, errorDesc } of prs) {
      if (errorDesc !== 'unknown error') {
        log.add(number, { number, closedOpened: true, errorDesc });
        if (config.oneoff.productionRun) {
          await closeOpen(number);
          await rateLimiter(90000);
        }
      } else {
        log.add(number, { number, closedOpened: false, errorDesc });
      }
    }
  })
  .then(() => {
    log.finish();
    console.log('closing/reopening of PRs complete');
  })
  .catch(err => {
    log.finish();
    console.log(err);
  });
*/














