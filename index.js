import { getInput, setFailed } from "@actions/core";

try {
  getInput("slack-channel-id", { required: true });
  getInput("slack-access-token", {
    required: true,
  });
  getInput("pocket-access-token", {
    required: true,
  });
} catch (error) {
  setFailed(error.message);
}
