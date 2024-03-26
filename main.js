// Please see README for better idea of what this challenge was about

// needed global variables
let usedNums = [,];

// functions

// small function to keep track of used specimen numbers so there are no duplicated object._specimenNums (important for compareDNA() method)
function checkUsedNums(usedNums, specimenNum) {
  for (let i = 0; i < usedNums.length; i++) {
    if (usedNums[i] === specimenNum) {
      return false;
    }
    else {
      usedNums.push(specimenNum);
      return true;
    }
  }
}

// Returns a random DNA base
function returnRandBase() {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single strand of DNA containing 15 bases
function mockUpStrand() {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

/* factory function to create objects that contain _specimenNum, _dna and methods for mutating current object, 
checking survivabilty of organism in current object and comparing 2 objects */
function pAequorFactory(specimenNum, dna) {
  if (checkUsedNums(usedNums, specimenNum)) {
    if (dna.length === 15) {
      if (typeof dna === "object") {
        return {
          _specimenNum: specimenNum,
          _dna: dna,
          mutate() { // selects a random base in _dna array and assigns it a new base if the new base !== to current base (base value must always change)
            let i = true;
            let randomBase = returnRandBase();
            while (i === true) {
              let randomPos = [Math.floor(Math.random() * this._dna.length)];
              if (this._dna[randomPos] !== randomBase) {
                this._dna[randomPos] = randomBase;
                i = false;
              }
            }
            return this._dna;
          },
          compareDNA(objToCompare) { // compares current object to another object and outputs the % of DNA they share
            let matchDNA = [];
            for (let i = 0; i < this._dna.length; i++) {
              if (objToCompare._dna[i] === this._dna[i]) {
                matchDNA.push(objToCompare._dna[i]);
              }
            }
            let roundedCommonPerc2dp = Math.round(((100 / 15) * matchDNA.length) * 100) / 100;
            console.log(`Specimen ${this._specimenNum} and specimen ${objToCompare._specimenNum} have ${roundedCommonPerc2dp}% (2dp) DNA in common.`);
          },
          willLikelySurvive() { // checks if organism is likely to survive. If % of C + G bases is >= 60% of total bases
            let cgCount = 0;
            for (let i = 0; i < this._dna.length; i++) {
              if (this._dna[i] === "C" || this._dna[i] === "G") {
                cgCount++;
              }
            }
            let roundedCG2cp = Math.round(((100 / 15) * cgCount) * 100) / 100;
            if (roundedCG2cp >= 60) {
              return true;
            }
            else {
              return false;
            }
          }
        };
      } else {
        console.log("The DNA you entered is in the wrong format. Please use an array.");
      }
    } else {
      console.log("DNA array must be 15 bases long.")
    }
  } else {
    console.log("The number you entered has already been used. Here is a list of the used numbers:");
    console.log(usedNums.join(", "));
  }
}

// creates a batch of (x) objects that have 60%+ chance of surviving in new array batchInstances
function batchWillSurvive(numOfInstances) {
  let batchInstances = [];
  for (let i = 0; batchInstances.length < numOfInstances; i++) {
    let obj = pAequorFactory(i, mockUpStrand())
    if (obj.willLikelySurvive() === true) {
      batchInstances.push(obj)
    }
  }
  return batchInstances
}

// executions (testing)

// create 2 objects with random DNA sequence created by mockUpStrand() function
const obj1 = pAequorFactory(1, mockUpStrand());
const obj2 = pAequorFactory(2, mockUpStrand());

//check contents of each obj _dna
console.log(obj1._dna);
console.log(obj2._dna);

// use compare method to see % similar DNA - logs to console
obj1.compareDNA(obj2);

// use mutate method to mutate obj1
console.log(obj1._dna);
console.log(obj1.mutate());

// use method to check if obj1 will survive (if C+G makes up 60%+ of the bases)
console.log(obj1.willLikelySurvive());


// test batch capability to create 30 objects in array
console.log(batchWillSurvive(30));



