const QuarterType = {
	Q1: "1",
	Q2: "2",
	Q3: "3",
	Q4: "4"
}

function getQuarter() {
  var month = new Date().getMonth();
  switch (month) {
    case 0:
      case 1:
        case 2:
      return QuarterType.Q1;

      case 3:
        case 4:
          case 5:
      return QuarterType.Q2;

      case 6:
        case 7:
          case 8:
      return QuarterType.Q3;
      
    default:
      return QuarterType.Q4;
  }
}

const dateTime = {}
dateTime.getQuarter = getQuarter()
dateTime.QuarterType = QuarterType

export default dateTime