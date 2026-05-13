# js-basics-project
JS basics project for Winc Full Stack Developer course

<mark>Q&A</mark>  
Natasja en AI (Claude)

* * *

### <span style="color: rgb(53, 152, 219);">Antwoord AI gebruikt in mijn script => line 26 - 117</span>

<mark>Q:</mark> kan je met continue ook terug naar de vraag die niet goed beantwoord was ipv weer helemaal naar het begin?

```js
while (true) {
  profile.first_name = prompt(`${questions[0]}`);
  profile.last_name = prompt(`${questions[1]}`);

  if (profile.first_name.length <= 0 || profile.last_name.length <= 0) {
    console.log("Please enter a valid name.");
    continue;
  }

  profile.age = Number(prompt(`${questions[2]}`));

  if (profile.age < 18) {
    let difference = 18 - profile.age;
    let year = difference === 1 ? "year" : "years";
    console.log(
      `We're sorry but you need to be 18+ to make use of our datingapp 🤷 Maybe we'll see you in ${difference} ${year}!`
    );
    break;
  }

}
```

<mark>A:</mark> Nee, `continue` springt altijd terug naar het begin van de loop. Voor per-vraag herhaling heb je een geneste loop per vraag nodig.

* * *

### <span style="color: rgb(53, 152, 219);">Antwoord AI gebruikt in mijn script => line 23, 26, 55 en 116</span>

<mark>Q:</mark> hoe breek ik vanuit een while child uit de parent while loop?

<mark>A:</mark> Dat kan niet direct in JS. Opties:

**1\. label:**

```js
outer: while (true) {
  while (true) {
    break outer; // breekt uit de buitenste loop
  }
}
```

**2\. vlag:**

```js
let done = false;
while (!done) {
  while (true) {
    done = true;
    break;
  }
}
```

**3\. functie** — stop de hele loop in een functie en gebruik `return`.

* * *

### <span style="color: rgb(53, 152, 219);">Antwoord AI gebruikt in mijn script => line 56</span>

<mark>Q:</mark> alleen uitleggen waarom done = true hier niet uit de parent while breekt

```js
let done = false;
while (!done) {
profile.first_name = prompt(${questions[0]} );
profile.last_name = prompt(${questions[1]} );
if (profile.first_name.length <= 0 || profile.last_name.length <= 0) {
console.log("Please enter a valid name.");
continue;
  }
while (true) {
profile.age = Number(prompt(${questions[2]} ));
if (isNaN(profile.age) || profile.age === 0) {
console.log("Please enter a valid number.");
continue;
    }
break;
  }
if (profile.age < 18) {
let difference = 18 - profile.age;
let year;
if (difference === 1) {
year = "year";
    } else {
year = "years";
    }
console.log(
We're sorry but you need to be 18+ to make use of our datingapp \uD83E\uDD37 Maybe we'll see you in ${difference} ${year}!,
    );
done = true;
  }
while (true) {
profile.gender = prompt(${questions[3]} ).toUpperCase();
if (["M", "F", "X"].includes(profile.gender)) break;
console.log("Please use F, M or X for gender.");
  }
}
```

<mark>A:</mark> `done = true` verandert de variabele, maar de huidige iteratie loopt gewoon door — JS controleert `!done` pas **bij de volgende iteratie**. Dus na `done = true` worden de gender-vragen nog steeds gesteld.

Oplossing: voeg een `continue` toe zodat de rest van de iteratie overgeslagen wordt.

* * *

<mark>Q:</mark> deze code ga ik inleveren. check hem alleen op echte fouten, niet op wat evt beter kan.

<mark>A:</mark> Één echte fout:

```js
let savedProfileLocation = profile.location; // moet savedProfile.location zijn
```

