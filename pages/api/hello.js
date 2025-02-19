// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default  async (req, res)=>{
  const axios = require('axios')
  var query=decodeURIComponent(req.query.term)
  var splitQuery=query.split('::')
  var ufcMatchId=splitQuery[splitQuery.length-4]
  var matchTypesNo=splitQuery[splitQuery.length-3]
  var dbRef=query.split('::').slice(0,3)+''
   dbRef=dbRef.replace(/,/g,"/")
   var firstEventTime=splitQuery[splitQuery.length-2]
   var lastEventTime=splitQuery[splitQuery.length-1]
  //dbRef='/'+dbRef+'/'
  console.log('on dbRef',dbRef)
  console.log('ufcMatchId',ufcMatchId)
  console.log('on query',query)
  console.log('matchTypesNo',matchTypesNo)
  console.log('firstEventTime',firstEventTime,'lastEventTime',lastEventTime)
 

 var oddsApi="https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds?commenceTimeFrom="+firstEventTime+"&commenceTimeTo="+lastEventTime+"&regions=us&markets=h2h&oddsFormat=american&apiKey=82315a13f42fe75c782f5def370b12e9"
 console.log(oddsApi)
 const response = await axios.get(oddsApi)
 var theOddsJson=response.data
 console.log('theOddsJson',theOddsJson)
 //sortOddsJson2(theOddsJson)
 
  res.status(200).json({ name: "John Doe" });
}


