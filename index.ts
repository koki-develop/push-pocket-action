import { getInput, setFailed } from "@actions/core";

try {
  getInput("slack-channel-id", { required: true });
  getInput("slack-access-token", {
    required: true,
  });
  getInput("pocket-access-token", {
    required: true,
  });
  getInput("archive", { required: false }) ?? "true";
} catch (error: any) {
  setFailed(error.message);
}
