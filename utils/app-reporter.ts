import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestError,
  TestResult,
  TestStep
} from '@playwright/test/reporter';

class AppReporter implements Reporter {
  // onBegin(config: FullConfig, suite: Suite) {
  //   console.log(`Starting the run with ${suite.allTests().length} tests`);
  // }

  // onTestBegin(test: TestCase, result: TestResult) {
  //   console.log(`Starting test ${test.title}`);
  // }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
    if (step.error) {
      const stack = step.error.stack;
      if (stack) {
        console.log("\n" + stack);
        result.stdout.push("\n" + stack);
      }
      const snippet = step.error.snippet;
      if (snippet) {
        console.log("\n" + snippet);
        result.stdout.push("\n" + snippet);
      }
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status;
    console.log(`\nFinished test "${test.title}": ${status}`);

    if (status == "skipped") return;

    let aMsg = "";
    if (result.attachments) {
      aMsg = `\n${JSON.stringify(result.attachments)}`;
      console.log(aMsg);
      result.stdout.push(aMsg);
    }

    let tsmLog = "";
    tsmLog += "\n=========>>> All log messages to TEST MANAGEMENT SYSTEM (TMS)\n";

    tsmLog += result.stdout.join("");

    console.log(tsmLog);
  }

  // onEnd(result: FullResult) {
  //   console.log(`Finished the run: ${result.status}`);
  // }
}

export default AppReporter;