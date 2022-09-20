import axios from "axios";
import _ from "lodash";
import core from "@actions/core";
import { WebClient } from "@slack/web-api";

type PocketListResponse = {
  list: Record<string, Item>;
};

type Item = {
  item_id: string;
  given_url: string;
  resolved_title?: string;
  excerpt?: string;
};

(async () => {
  try {
    const slackChannelId = core.getInput("slack-channel-id", {
      required: true,
    });
    const slackAccessToken = core.getInput("slack-access-token", {
      required: true,
    });
    const pocketConsumerKey = core.getInput("pocket-consumer-key", {
      required: true,
    });
    const pocketAccessToken = core.getInput("pocket-access-token", {
      required: true,
    });
    const count = Number(core.getInput("count", { required: false })) || 5;
    const archive = core.getInput("archive", { required: false }) || "true";

    const { data } = await axios.get<PocketListResponse>(
      "https://getpocket.com/v3/get",
      {
        params: {
          consumer_key: pocketConsumerKey,
          access_token: pocketAccessToken,
        },
      }
    );
    const items = Object.entries(data.list).map(([, item]) => item);
    const pickedItems = _.sampleSize(items, count);

    const title = "Picked Up Items";

    const blocks = [
      {
        type: "header",
        text: { type: "plain_text", text: title },
      },
      { type: "divider" },
    ];
    if (pickedItems.length === 0) {
      blocks.push({
        type: "section",
        text: {
          type: "plain_text",
          text: "No items.",
        },
      });
    } else {
      for (const item of pickedItems) {
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*<${item.given_url}|${
              item.resolved_title ?? item.given_url
            }>* ( <https://getpocket.com/read/${item.item_id}|Pocket> )`,
          },
        });
        if (item.excerpt) {
          blocks.push({
            type: "section",
            text: {
              type: "plain_text",
              text: `${item.excerpt}...`,
            },
          });
        }
        blocks.push({ type: "divider" });
      }
    }

    const slack = new WebClient(slackAccessToken);
    await slack.chat.postMessage({
      channel: slackChannelId,
      text: title,
      blocks,
    });

    if (pickedItems.length === 0 || archive !== "true") {
      return;
    }

    await axios.post(
      "https://getpocket.com/v3/send",
      {
        consumer_key: pocketConsumerKey,
        access_token: pocketAccessToken,
        actions: pickedItems.map((item) => ({
          action: "archive",
          item_id: item.item_id,
        })),
      },
      {
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error: any) {
    core.setFailed(error.message);
  }
})();
