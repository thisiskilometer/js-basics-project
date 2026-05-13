"use strict";
const prompt = require("prompt-sync")();

const mockData = require("./mockData.js").data;

//  Declare questions array for new user.
let questions = [
  "What is your first name?",
  "What is your last name?",
  "What is your age?",
  "What is your gender? (F, M, X)",
  "Which genders are you interested in dating? (F, M, X)",
  "Where do you live, rural or in the city?",
  "What is the minimal age that you're interested in?",
  "What is the maximum age you're interested in?",
];

// Declare a profile object for new user
const profile = {};
const genders = ["M", "F", "X"];

// Declare done (boolean) for ending while loop if conditions meet.
let done = false;

// Loop through questions and create a new profile.
while (!done) {
  profile.first_name = prompt(`${questions[0]} `);
  profile.last_name = prompt(`${questions[1]} `);
  // Check if names are valid.
  if (profile.first_name.length <= 0 || profile.last_name.length <= 0) {
    console.log("Please enter a valid name.");
    continue;
  }
  // Check if user entered a valid data type and age.
  while (true) {
    profile.age = Number(prompt(`${questions[2]} `));
    if (isNaN(profile.age) || profile.age <= 0 || profile.age > 110) {
      console.log("Please enter a valid age => from 18 through 110.");
      continue;
    }
    break;
  }
  // Check age.
  if (profile.age < 18) {
    let difference = 18 - profile.age;
    let year;
    if (difference === 1) {
      year = "year";
    } else {
      year = "years";
    }
    console.log(
      `We're sorry but you need to be 18+ to make use of our datingapp \uD83E\uDD37 Maybe we'll see you in ${difference} ${year}!`,
    );
    done = true;
    continue;
  }

  while (true) {
    profile.gender = prompt(`${questions[3]} `).trim().toUpperCase();
    profile.gender_preference = prompt(`${questions[4]} `).trim().toUpperCase();
    // Check if gender values are valid.
    if (
      genders.includes(profile.gender) &&
      genders.includes(profile.gender_preference)
    )
      break;
    console.log("Please use F, M or X for gender and gender preferences.");
  }

  while (true) {
    profile.location = prompt(`${questions[5]} `).trim().toLowerCase();
    // check if location values are valid.
    if (profile.location === "rural" || profile.location === "city") break;
    console.log('Please enter "rural" or "city"');
  }

  while (true) {
    profile.min_age_interest = Number(prompt(`${questions[6]} `));
    if (
      isNaN(profile.min_age_interest) ||
      profile.min_age_interest === 0 ||
      profile.min_age_interest > 110
    ) {
      console.log("Please enter a valid number (18 - 110).");
      continue;
    } else if (profile.min_age_interest < 18) {
      console.log("We only accept members who are 18 years of age or older");
      continue;
    }
    break;
  }

  while (true) {
    profile.max_age_interest = Number(prompt(`${questions[7]} `));
    if (isNaN(profile.max_age_interest) || profile.max_age_interest <= 0) {
      console.log("Please enter a valid number.");
      continue;
    } else if (profile.max_age_interest < 18) {
      console.log("We only have members of 18 years or older");
      continue;
    } else if (profile.max_age_interest > 110) {
      console.log(
        `Looking for someone older than ${profile.max_age_interest} years? Maybe not that realistic \uD83D\uDE09\uD83D\uDC75\uD83D\uDC74`,
      );
      continue;
    } else if (profile.max_age_interest < profile.min_age_interest) {
      console.log(
        `The maximum age that you're interested in should be higher than your minimum age of interest (${profile.min_age_interest}).`,
      );
      continue;
    }
    break;
  }
  // End the parent while loop.
  done = true;
}

//  Declare variables of new profile values.

let profileName = profile.first_name;
let profileAge = profile.age;
let profileGender = profile.gender;
let profileGenderPref = profile.gender_preference;
let profileLocation = profile.location;
let profileMinAgeInterest = profile.min_age_interest;
let profileMaxAgeInterest = profile.max_age_interest;

// Declare counter for counting matches.
let counter = 0;
// Declare id for giving id's to the existing profiles.
let id = 0;
// Declare array to store id's of matches.
let matches = [];

// Loop through existing profiles.
for (const existingProfile of mockData) {
  //  Declare variables of existing profile values.
  let existingProfileName = existingProfile.first_name;
  let existingProfileAge = existingProfile.age;
  let existingProfileGender = existingProfile.gender;
  let existingProfileGenderPref = existingProfile.gender_preference;
  let existingProfileLocation = existingProfile.location;
  let existingProfileMinAgeInterest = existingProfile.min_age_interest;
  let existingProfileMaxAgeInterest = existingProfile.max_age_interest;

  // Looking for a match between user and existing profiles using conditionals.
  if (
    existingProfileGender === profileGenderPref &&
    profileGender === existingProfileGenderPref &&
    existingProfileLocation === profileLocation &&
    existingProfileMinAgeInterest <= profileAge &&
    existingProfileMaxAgeInterest >= profileAge &&
    existingProfileAge >= profileMinAgeInterest &&
    existingProfileAge <= profileMaxAgeInterest
  ) {
    // Add match number -1 to list of matches.
    matches.push(id);
    counter++;
  }
  id++;
}

// Inform the user about number of match(es).
console.log(`Hi ${profileName}, you have ${counter} matches.\n`);
// Generate the match profiles.
for (let match of matches) {
  match = mockData[match];
  let matchFirstName = match["first_name"];
  let matchLastName = match["last_name"];
  let matchAge = match["age"];
  let matchGender = match["gender"];
  let matchLocation = match["location"];

  let genderPronoun;
  let live = "lives";
  let locationDescription;

  if (matchGender === "F") {
    genderPronoun = "She is";
  } else if (matchGender === "M") {
    genderPronoun = "He is";
  } else if (matchGender === "X") {
    genderPronoun = "They are";
    live = "live";
  }
  // Determine location description.
  if (matchLocation === "city") {
    locationDescription = "the city";
  } else if (matchLocation === "rural") {
    locationDescription = "a rural area";
  }

  // Inform the user about match(es).
  console.log(
    `You and ${matchFirstName} ${matchLastName} have a match \uD83C\uDF89`,
  );
  console.log(
    `${genderPronoun} ${matchAge} years old and ${live} in ${locationDescription}.`,
  );
  console.log(`\n`);
}
