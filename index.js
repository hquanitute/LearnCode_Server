const parseMD = require('parse-md').default;
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var request = require('request');
const mongoose = require('mongoose');
// Connect to database
let count = 0;
mongoose.Promise = global.Promise;

function connectDatabase() {
    // let mongoString = "mongodb://localhost:27017/learncode";
    let mongoString ="mongodb+srv://admin:admin@kltn-u0aoa.mongodb.net/learncode";

    mongoose.connect(mongoString
        , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log('Connect to database successfully');
            print(path).catch(console.error);
            // Load client secrets from a local file.
            // fs.readFile('./env/credentials.json', (err, content) => {
            //     if (err) return console.log('Error loading client secret file:', err);
            //     // Authorize a client with credentials, then call the Google Drive API.
            //     // authorize(JSON.parse(content), ()=>{

            //     // });
            // });
        })
        .catch((err) => {
            console.log(`Cannot connect to database. Try connecting after 5 seconds (${++count})`);
            setTimeout(connectDatabase, 5000);
        });
}

connectDatabase();

const Course = require('./app/models/course');
const Lesson = require('./app/models/lesson');
const Challenge = require('./app/models/challenge');

let path = './data/'
let i = 0;
let countNum = 0;
let count1 =0;
let count2 =0;
async function print(path) {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
        let course = new Course();
        course.name = dirent.name;
        course.dashName = dirent.name;
        course.save();
        const dirLessons = await fs.promises.opendir(path + dirent.name);
        for await (const dirLesson of dirLessons) {
            let lesson = new Lesson();
            lesson.name = dirLesson.name;
            lesson.dashName = dirLesson.name;
            lesson.save();
            const listChallenges = await fs.promises.opendir(path + dirent.name + "/" + dirLesson.name)
            for await (const challengeFile of listChallenges) {
                const readFileBufer = await fs.promises.readFile(path + dirent.name + "/" + dirLesson.name + "/" + challengeFile.name)
                // console.log(readFileBufer.toString())
                try {
                    
                    const { metadata, content } = parseMD(readFileBufer.toString())
                    let contentRemovedKey= "";
                    if (!content.includes('### Before Test') && !content.includes('### After Test')){
                        count1++;
                        contentRemovedKey = content.replace("## Description", "##").replace("## Instructions", "##").replace("## Tests", "##").replace("## Challenge Seed", "##").replace("## Solution", "##");
                    }
                    if (content.includes('### Before Test') && !content.includes('### After Test')){
                        count1++;
                        contentRemovedKey = content.replace("## Description", "##").replace("## Instructions", "##").replace("## Tests", "##").replace("## Challenge Seed", "##").replace("## Solution", "##").replace("### Before Test","## Before Test");
                    }
                    if (!content.includes('### Before Test') && content.includes('### After Test')){
                        count1++;
                        contentRemovedKey = content.replace("## Description", "##").replace("## Instructions", "##").replace("## Tests", "##").replace("## Challenge Seed", "##").replace("## Solution", "##").replace("### After Test","## After Test");
                    }
                    if (content.includes('### Before Test') && content.includes('### After Test')){
                        count1++;
                        contentRemovedKey = content.replace("## Description", "##").replace("## Instructions", "##").replace("## Tests", "##").replace("## Challenge Seed", "##").replace("## Solution", "##").replace("### Before Test","## Before Test").replace("### After Test","## After Test");
                    }
                    
                    let arrStringContent = contentRemovedKey.split("##");
                    // if(arrStringContent.length ==8){
                    //     console.log(path + dirent.name + "/" + dirLesson.name + "/" + challengeFile.name)
                    //     count2++;
                    // }

                    let challenge = new Challenge()
                    challenge.title = metadata.title;
                    challenge.dashedName = challenge.name;
                    challenge.block = dirLesson.name;
                    challenge.superBlock = dirent.name;
                    challenge.challengeType = metadata.challengeType;
                    challenge.video = metadata.videoUrl;
                    challenge.forumTopicId = metadata.forumTopicId;
                    challenge.description = arrStringContent[1];
                    challenge.instructions = arrStringContent[2];
                    challenge.tests = arrStringContent[3];
                    challenge.challengeSeed = (arrStringContent[4]);
                    if (!contentRemovedKey.includes('Before Test') && !contentRemovedKey.includes('After Test') && arrStringContent.length == 6) {
                        challenge.solution =  arrStringContent[5];
                        challenge.save();
                        // countNum++;
                        continue;
                    }
                    if (contentRemovedKey.includes('Before Test') && !contentRemovedKey.includes('After Test') && arrStringContent.length == 7) {
                        challenge.beforeTest =  arrStringContent[5];
                        challenge.solution =  arrStringContent[6];
                        challenge.save();
                        // countNum++;
                        continue;
                    }
                    if (!contentRemovedKey.includes('Before Test') && contentRemovedKey.includes('After Test') && arrStringContent.length == 7) {
                        challenge.afterTest =  arrStringContent[5];
                        challenge.solution =  arrStringContent[6];
                        challenge.save();
                        // countNum++;
                        continue;
                    }
                    if (contentRemovedKey.includes('Before Test') && contentRemovedKey.includes('After Test') && arrStringContent.length == 8) {
                        challenge.beforeTest =  arrStringContent[5];
                        challenge.afterTest =  arrStringContent[6];
                        challenge.solution =  arrStringContent[7];
                        challenge.save().then((value,err)=>{
                            if(err){
                                console.log(path + dirent.name + "/" + dirLesson.name + "/" + challenge.name)
                            }
                        });
                        countNum++;
                        continue;
                    }

                } catch (error) {
                    console.log(error);
                    console.log(path + dirent.name + "/" + dirLesson.name + "/" + challenge.name)
                }

            }
        }
    }
    console.log(count2)
    console.log(count1)
    console.log(countNum)
}
// Call function load data from md file
// print(path).catch(console.error);






































// If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly',
//     'https://www.googleapis.com/auth/drive',
//     'https://www.googleapis.com/auth/drive.file',
//     'https://www.googleapis.com/auth/drive.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = 'token.json';



// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(
//         client_id, client_secret, redirect_uris[0]);

//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, (err, token) => {
//         if (err) return getAccessToken(oAuth2Client, callback);
//         oAuth2Client.setCredentials(JSON.parse(token));
//         callback(oAuth2Client);
//     });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(oAuth2Client, callback) {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES,
//     });
//     console.log('Authorize this app by visiting this url:', authUrl);
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     rl.question('Enter the code from that page here: ', (code) => {
//         rl.close();
//         oAuth2Client.getToken(code, (err, token) => {
//             if (err) return console.error('Error retrieving access token', err);
//             oAuth2Client.setCredentials(token);
//             // Store the token to disk for later program executions
//             fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//                 if (err) return console.error(err);
//                 console.log('Token stored to', TOKEN_PATH);
//             });
//             callback(oAuth2Client);
//         });
//     });
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listFilesinFolder(auth) {
//     const drive = google.drive({ version: 'v3', auth });
//     drive.files.list({
//         q: "'1nrqHykB9pe1EZbkRwnugvgbbXLKz0c4T' in parents"
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const files = res.data.files;
//         if (files.length) {
//             console.log('Files:');
//             files.map((file) => {
//                 console.log(`${file.name} (${file.id})`);
//             });
//             console.log(files.length);
//         } else {
//             console.log('No files found.');
//         }
//     });
// }

// function listFoldersInFolder(auth) {
//     const drive = google.drive({ version: 'v3', auth });
//     drive.files.list({
//         q: "'1R2dHqUZyIEor6zBH_CyOm2xXZAcpVkRM' in parents"
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const files = res.data.files;
//         if (files.length) {
//             console.log('Files:');
//             files.map((file) => {
//                 console.log(`${file.name} (${file.id}) ${file.mimeType}`);
//             });
//             console.log(files.length);
//         } else {
//             console.log('No files found.');
//         }
//     });
// }

// function readFile(auth) {
//     request.get('https://drive.google.com/u/0/uc?id=150N-0mVMg7Qc6vhMfGurh081NPJtWwIO&export=download', function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body);
//             // Continue with your processing here.
//         }
//     });
// }

// function updateFile(auth) {
//     const drive = google.drive({ version: 'v3', auth });
//     drive.files.update({
//         fileId: "15vVA7Ev5iITK-2fIUare5Oqmy1R3Zl9X",

//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const files = res.data.files;
//         if (files.length) {
//             console.log('Files:');
//             files.map((file) => {
//                 console.log(`${file.name} (${file.id}) ${file.mimeType}`);
//             });
//             console.log(files.length);
//         } else {
//             console.log('No files found.');
//         }
//     });
// };

// async function generateCourses(auth) {
//     const drive = google.drive({ version: 'v3', auth });
//     let resCourse = await drive.files.list({
//         q: "'1RM6K4e90cp_WXNBEdeI3HViv-eRbO1Uk' in parents",
//         pageSize: 300,
//     })
//     resCourse.data.files.map(courseFile => {
//         let course = new Course();
//         course.driveId = courseFile.id;
//         course.name = courseFile.name;
//         course.driveName = courseFile.name;
//         Course.create(course).then(console.log("Create course " + courseFile.id));
//     })

//     resCourse.data.files.map(async (courseFile) => {
//         let lessons = await drive.files.list({
//             q: "'" + courseFile.id + "' in parents",
//             pageSize: 300,
//         });

//         let course = await Course.findOne({ driveId: courseFile.id });

//         course.lessons = [];
//         lessons.data.files.map(async (lessonFile) => {
//             let lesson = new Lesson();
//             lesson.driveId = lessonFile.id;
//             lesson.driveName = lessonFile.name;
//             lesson.name = lessonFile.name;
//             let lessonCreated = await Lesson.create(lesson);
//             //Done create course, lesson and add object id lesson to course
//             let lessonFound = await Lesson.findById(lessonCreated._id)
//             lessonFound.challenges = [];

//             let resChallenge = await drive.files.list({
//                 q: "'" + lessonFile.id + "' in parents",
//                 pageSize: 500,
//             })
//             resChallenge.data.files.map(async (challengeFile) => {
//                 let challenge = new Challenge();
//                 challenge.driveId = challengeFile.id;
//                 challenge.driveName = challengeFile.name;
//                 challenge.name = challengeFile.name;
//                 let challengeCreated = await Challenge.create(challenge);
//             })

//         })
//     })

// }

// function addLessonsToCourse(auth) {
//     Course.find().then(async(courses) => {
//         courses.map(async(course) => {
//             const drive = google.drive({ version: 'v3', auth });
//             let resLesson = await drive.files.list({
//                 q: "'"+course.driveId+"' in parents"
//             })

//             let arrays =[]
//             for(let i =0;i<resLesson.data.files.length;i++){
//                 let lessonFound = await Lesson.findOne({driveId: resLesson.data.files[i].id})
//                 arrays.push(lessonFound._id);
//             }
//             course.lessons=arrays;
//             course.save();
//         })
//     })
// }

// function addChallengesToLesson(auth) {
//     Lesson.find().then(async(lessons) => {
//         lessons.map(async(lesson) => {
//             const drive = google.drive({ version: 'v3', auth });
//             let resChallenge = await drive.files.list({
//                 q: "'"+lesson.driveId+"' in parents",
//                 pageSize: 500,
//             })

//             let arrays =[]
//             for(let i =0;i<resChallenge.data.files.length;i++){
//                 let challengeFound = await Challenge.findOne({driveId: resChallenge.data.files[i].id})
//                 console.log(challengeFound._id)
//                 arrays.push(challengeFound._id);
//             }
//             lesson.challenges=arrays;
//             lesson.save();
//         })
//     })
// }

// function addChallengesByIdToLesson(auth) {
//     Lesson.findById("5e59d63331f0a312d8ef3f16").then(async(lesson) => {
//         console.log(lesson.name);
//         const drive = google.drive({ version: 'v3', auth });
//             let resChallenge = await drive.files.list({
//                 q: "'"+lesson.driveId+"' in parents",
//                 pageSize: 500,
//             })

//             let arrays =[]
//             for(let i =0;i<resChallenge.data.files.length;i++){
//                 let challengeFound = await Challenge.findOne({driveId: resChallenge.data.files[i].id})
//                 console.log(challengeFound._id)
//                 arrays.push(challengeFound._id);
//             }
//             lesson.challenges=arrays;
//             lesson.save();
//     })
// }