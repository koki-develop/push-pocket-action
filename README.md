[![GitHub Actions](https://github.com/koki-develop/push-pocket-action/actions/workflows/main.yml/badge.svg)](https://github.com/koki-develop/push-pocket-action/actions/workflows/main.yml)
[![release](https://img.shields.io/github/v/release/koki-develop/push-pocket-action)](https://github.com/koki-develop/push-pocket-action/releases/latest)
[![Twitter Follow](https://img.shields.io/twitter/follow/koki_develop?style=social)](https://twitter.com/koki_develop)

# push-pocket-action

Randomly push items saved in pocket to Slack.

# Usage

```yml
- uses: koki-develop/push-pocket-action@v1.0.0
  with:
    # Slack channel ID to push to
    slack-channel-id: "CHANNEL_ID"
    # Slack access token
    slack-access-token: ${{ secrets.SLACK_ACCESS_TOKEN }}
    # Pocket application consumer key
    pocket-consumer-key: ${{ secrets.POCKET_CONSUMER_KEY }}
    # Pocket access token
    pocket-access-token: ${{ secrets.POCKET_ACCESS_TOKEN }}
    # Number of items to push at once. Default is 5.
    count: 3
    # Whether to archive pushed items or not. Default is true.
    archive: true
```

# LICENSE

[MIT](./LICENSE)
