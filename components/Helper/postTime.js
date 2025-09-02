import dayjs from 'dayjs';
var postTime = (postedTime) => {
  var thePostTime = dayjs(postedTime).format('DD MMM YYYY HH:mm A')
  var todayTime=dayjs(new Date())
  var thePostTime = dayjs(postedTime)
  var yearFormat = dayjs(postedTime).format('DD MMM YYYY')
  var monthFormat = dayjs(postedTime).format('DD MMM')
  var dayFormat = dayjs(postedTime).format('ddd')
  var hourFormat = dayjs(postedTime).format('HH:mm')

  var yearsDiff=todayTime.diff(thePostTime, 'year')
  var monthsDiff=todayTime.diff(thePostTime, 'month')
  var weekDiff=todayTime.diff(thePostTime, 'week')
  var daysDiff=todayTime.diff(thePostTime, 'day')
  var hourDiff=todayTime.diff(thePostTime, 'hour')
  var minDiff=todayTime.diff(thePostTime, 'minute')
  var secDiff=todayTime.diff(thePostTime, 'second')
  var theTimeToShow = ''
  if(yearsDiff<1){
    if(monthsDiff>=1){
      theTimeToShow=monthFormat
    }else{
       if(weekDiff>=1){
        theTimeToShow=monthFormat
       }else{
        if(daysDiff>1){
         theTimeToShow=dayFormat
        }else if(daysDiff===1){
          theTimeToShow='Yest'
        }else{
         if(hourDiff>=1){
            theTimeToShow=hourFormat
         }else{
          if(minDiff>=1){
          theTimeToShow=minDiff+' Min'
          }else{
            if(secDiff<1){theTimeToShow='Just Now'}
            else{theTimeToShow=secDiff+' Sec'}
          }
            
         }
        }
       
       }
    }
  }
  else{
    theTimeToShow=yearFormat
  }
  return theTimeToShow
}
  export default postTime