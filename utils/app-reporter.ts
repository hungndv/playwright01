import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
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

  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status;
    console.log(`\nFinished test "${test.title}": ${status}`);
    const msg = result.steps.reduce<string>((msg: string, step: TestStep, currentIndex: number): string => {
      msg += `${currentIndex != 0 ? "\n" : ""}\t${step.title} -- ${step.location?.file.replace(/^.*[\\/]/, '')}:${step.location?.line} -- ${step.duration}`;
      if (step.error) {
        msg += `\n${step.error.message}`;
        if (result.attachments[0]) {
          msg += `\n${result.attachments[0].path}`;
        }
      }
      return msg;
    }, "");

    if (status != "skipped") {
      console.log(msg);
    }
  }

  // onEnd(result: FullResult) {
  //   console.log(`Finished the run: ${result.status}`);
  // }
}

export default AppReporter;