const readline = require('readline');

const rl = readline.createInterface(process.stdin,process.stdout);

let robot ={
  numberTestCases: 0,
  testCases: [],
  maxCoordinates: [],
  areaCoordinates:[],
  points:[]
};

let testCasesWords=["test case", "first test case", "next test case"];

let testCasesQuestion = (tC,resolve)=>{
  rl.question(`Enter the ${tC} to evaluate: `, tCases=>{
    if(tCases.length!=0){
      let tCasesLenght = --tCases.length;
      let character = '';
      let characterCounter = 0;
      for(var i=0;i<=tCasesLenght;i++){
        character=tCases.slice(i,++i); 
          if(character!='U' && character!='D' && character!='L' && character!='R' && character!='?'){
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
            maxCoordinatesCalculate();       
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


  let maxCoordinatesCalculate = ()=>{
    for(var i=0;i<robot.numberTestCases;i++){
      robot.maxCoordinates.push(0);
      robot.areaCoordinates.push(0);
      robot.points.push([0,0]);
    };
    for(var i=0;i<robot.testCases.length;i++){
      let xMin=0, xMax=0, yMin=0, yMax=0, dis=0, word='', u=0,d=0,r=0,l=0;
      for(var j=0;j<robot.testCases[i].length;j++){
        word=robot.testCases[i].slice(j,j+1);
        if(word=='U'){
            ++yMax;
            ++yMin;
            ++u;
        }else if(word=='D'){
            --yMax;
            --yMin;
            ++d;
        }else if(word=='R'){
            ++xMax;
            ++xMin;
            ++r;
        }else if(word=='L'){
            --xMax;
            --xMin;
            ++l;
        }else if(word=='?'){
            ++yMax;
            --yMin;
            ++xMax;
            --xMin;
        };
      };
      robot.maxCoordinates[i]=[yMax,xMax,yMin,xMin];
      robot.areaCoordinates[i]=[[r-l,yMax],[xMax,u-d],[r-l,yMin],[xMin,u-d]];
      for(var j=0;j<4;j++){
        dis=Math.abs(robot.areaCoordinates[i][j][0])+Math.abs(robot.areaCoordinates[i][j][1]);
        if(dis>=robot.points[i][0]){
            robot.points[i][0]=dis;
            robot.points[i][1]=j;
        };
      };

    };
    for(var i=0;i<robot.numberTestCases;i++){
        console.log(`For ${robot.testCases[i]} instructions, the maximum and minimum coordinates are: Ymax=${robot.maxCoordinates[i][0]}, Xmax=${robot.maxCoordinates[i][1]}, Ymin=${robot.maxCoordinates[i][2]}, Xmin=${robot.maxCoordinates[i][3]}`);
        console.log('');
        console.log(`The coordinates of the vertices of the area where the robot is located are: [${robot.areaCoordinates[i][0]}], [${robot.areaCoordinates[i][1]}], [${robot.areaCoordinates[i][2]}], [${robot.areaCoordinates[i][3]}]`);
        console.log('');
        console.log(`The maximum distance from [0,0] where the robot can be located  is ${robot.points[i][0]}, in the coordinate [${robot.areaCoordinates[i][robot.points[i][1]]}].`);
        console.log('');
      };
  };
  
  rl.question('Help! The robot is lost. Do you need to know the context? (y/n)',(res)=>{
    if(res=='y'){
      console.log('');
      console.log('NASA’s robot landed on Mars. The place where it landed can be modeled as an infinite 2-dimensional plane with perpendicular X-axis and Y-axis coordinates.');
      console.log('');
      console.log('In one of the space exploration missions, the robot sent a sequence of signals, which can be represented by a string composed of the following characters: ‘U’, ‘R’, ‘D’, ‘L’ or ‘?’. In uppercase and no spaces.');
      console.log('');
      console.log("‘U’ represents up (Y-coordinate increases by 1), ‘R’ represents right (X-coordinate increases by 1), ‘D’ represents down (Y-coordinate decreases by 1), ‘L’ represents left (X-coordinate decreases by 1) and ‘?’ represents a missed signal.");
      console.log('');
      console.log("Every character in the sequence is a single step in the corresponding direction. A missed signal is a single step in one of the four directions.");
      console.log('');
      console.log(`After sending some signals while the robot is moving, its software crashed and the robot could not do any further moves. The researchers on the base want to limit the space where they can look for the robot.`);
      console.log('');
      console.log(`In other words, they want to find the minimum possible X-coordinate, the minimum possible Y-coordinate, the maximum possible X-coordinate and the maximum possible Y-coordinate of the current location of the robot. This program can be tested on one or more test cases.`);
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