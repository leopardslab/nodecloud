const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const options = {
  apiVersion: "2016-11-15"
};

// Get CloudWatch object for AWS
const cloudWatch = ncProviders.aws.monitoring(options);

// Creating a cloud watch Alarm
function createAlarm() {
  // Relevant data for alarm
  const alarmData = {
    AlarmName: "Server_CPU_Warning",
    ComparisonOperator: "GreaterThanThreshold",
    EvaluationPeriods: 1,
    MetricName: "CPUUtilization",
    Namespace: "AWS/EC2",
    Period: 60,
    Statistic: "Average",
    Threshold: 90.0,
    ActionsEnabled: false,
    AlarmDescription: "Alarm when server CPU exceeds 90%",
    Dimensions: [
      {
        Name: "Node cloud",
        Value: "i-0b95e8fc47612bcf1" // instance ID of a EC2 instance
      }
    ],
    Unit: "Percent"
  };

  cloudWatch.createAlarm(alarmData).then(
    result => {
      console.log(result);
    },
    error => {
      console.log(error);
    }
  );
}

// Deleting alarms
function deleteAlrams() {
  // Add the alarms which needs to be deleted
  const alarmsList = { AlarmNames: ["Server_CPU_Warning"] };

  cloudWatch.deleteAlarms(alarmsList).then(
    result => {
      console.log(result);
    },
    error => {
      console.log(error);
    }
  );
}

// Get all alarms
function getAllAlarms() {
  cloudWatch.describeAlarms({}).then(
    result => {
      console.log(result);
    },
    error => {
      console.log(error);
    }
  );
}

// Get specific alarms
function getSpecificAlarms() {
  // Filter the alarms list by attributes
  const params = {
    StateValue: "INSUFFICIENT_DATA"
  };

  cloudWatch.describeAlarms(params).then(
    result => {
      console.log(result);
    },
    error => {
      console.log(error);
    }
  );
}

// Get Metrics
function getMetrics() {
  var params = {
    Dimensions: [
      {
        Name: "LogGroupName"
      }
    ],
    MetricName: "CPUUtilization",
    Namespace: "AWS/Logs"
  };
  cloudWatch.listMetrics(params).then(
    result => {
      console.log(result);
    },
    error => {
      console.log(error);
    }
  );
}
