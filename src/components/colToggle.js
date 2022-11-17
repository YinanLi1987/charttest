
/**
 * Currently just a true/false statement, but this should recieve data from the custom view creator
 */

function colToggle() {
    var rowNum = "row-1"
    if (false) {
      rowNum = "row-1"
    } else {
      rowNum = "row-2"
    }
    
    return rowNum
  }

  /**  NOTE ABOUT COLUMNS
 * 
 * currently fixed to rows, will need to handle getting vs for custom views in pairs
 * will break if a row in the middle only has one v, but that shouldn't be an issue
 */


  export default colToggle