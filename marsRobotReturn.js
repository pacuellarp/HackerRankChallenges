const readline = require('readline');

const rl = readline.createInterface(process.stdin,process.stdout);

let robot ={
  numberTestCases: 0,
  testCases: [],
  coordinates: [],
  distance:[],
  point:[]
}

let testCasesWords=["test case", "first test case", "next test case"];

let testCasesQuestion = (tC,resolve)=>{
  rl.question(`Enter the ${tC} to evaluate: `, tCases=>{
    if(tCases.length!=0){
      let tCasesLenght = --tCases.length;
      let character = '';
      let characterCounter = 0;
      for(var i=0;i<=tCasesLenght;i++){
        character=tCases.slice(i,++i); 
          if(character!='U' && character!='D' && character!='L' && character!='R'){
            characterCounter = ++characterCounter;
        };
      }
      if(characterCounter==0){
        robot.testCases.push(tCases);
        resolve();
      }else{
        console.log("You've input a incorrect singal. This will be omitted.");
        testCasesQuestion(tC,resolve);
      };
    }else{
      console.log('Each test case is described in one line which contains a non-empty string.');
      testCasesQuestion(tC,resolve);
    }
  });
};


let numberTestCasesQuestion= (testCasesQuestion)=>{
  rl.question('How many test cases do you want to evaluate?: ', async (N)=>{
    N=N*1;
    if (typeof(N)==='number'){
      N=Math.floor(N);
       if(N>0 && N<=100){
        robot.numberTestCases=N;
        for(var i=1;i<=N;i++){
          if(N==1){
            await new Promise((resolve) => {
            testCasesQuestion(testCasesWords[0],resolve);
            }) 
          }else if(N>1 && i==1){
            await new Promise((resolve) => {
            testCasesQuestion(testCasesWords[1],resolve);
            }) 
          }else if(N>1 && i>1){
            await new Promise((resolve) => {
            testCasesQuestion(testCasesWords[2],resolve);
            }) 
          };
        };
        console.log('Next, the results are displayed in the respective order. Press Enter to continue:');
        rl.on("line",()=>{
          maxNumInstructions();       
          rl.close();
        })
       }else if (N>100){
        console.log("Sorry, the maximum number of test cases is 100.");
        numberTestCasesQuestion(testCasesQuestion);
       }else if(N==0){
        console.log("Ok.");
        rl.close()
       }else{
        console.log("Please input a positive number.");
        numberTestCasesQuestion(testCasesQuestion);
       };
    }else{
      console.log("Please input a number.");
      numberTestCasesQuestion(testCasesQuestion);
    };
  });
};



let maxNumInstructions = ()=>{
  for(var i=0;i<robot.numberTestCases;i++){
    robot.coordinates.push(0);
    robot.distance.push(0);
    robot.point.push(0);
  };
  for(var i=0;i<robot.testCases.length;i++){
    let n=0, m=0, dis=0, word='';
    for(var j=0;j<robot.testCases[i].length;j++){
      word=robot.testCases[i].slice(j,j+1);
      if(word=='U'){
        ++m;
      }else if(word=='D'){
        --m;
      }else if(word=='R'){
        ++n;
      }else if(word=='L'){
        --n;
      };
      dis=Math.abs(n)+Math.abs(m);
      if(dis>=robot.distance[i]){
        robot.coordinates[i]=[n,m];
        robot.distance[i]=dis;
        robot.point[i]=j+1;
      };
    };
  };
  for(var i=0;i<robot.numberTestCases;i++){
    console.log(`For ${robot.testCases[i]} instructions, the maximum distance from the initial position [0,0] is ${robot.distance[i]}, corresponding to coordinates [${robot.coordinates[i][0]},${robot.coordinates[i][1]}] in instruction number ${robot.point[i]}.`);
  };
};

rl.question('Do you need to know how the robot operates? (y/n)',(res)=>{
  if(res=='y'){
    console.log('');
    console.log('NASA’s robot landed on Mars. The place where it landed can be modeled as an infinite 2-dimensional plane with perpendicular X-axis and Y-axis coordinates.');
    console.log('');
    console.log('In one of the space exploration missions, the robot sent a sequence of signals, which can be represented by a string composed of the following characters: ‘U’, ‘R’, ‘D’ or ‘L’. In uppercase and no spaces.');
    console.log('');
    console.log("‘U’ represents up (Y-coordinate increases by 1), ‘R’ represents right (X-coordinate increases by 1), ‘D’ represents down (Y-coordinate decreases by 1), ‘L’ represents left (X-coordinate decreases by 1).");
    console.log('');
    console.log("Every character in the sequence is a single step in the corresponding direction.");
    console.log('');
    console.log(`Here, you'll be able to ensure of the security of the robot. You can know the maximum distance from the base that the robot will be while following your instructions.`);
    console.log('');
    rl.pause();
  }else if (res=='n'){
    console.log('');
    rl.pause();
  }else{
    console.log('');
    console.log(`It should be a 'n', but ok.`);
    console.log('');
    rl.pause();
  }
  rl.resume();
  numberTestCasesQuestion(testCasesQuestion);
});