import { boolean, command, positional } from "@drizzle-team/brocli";

const GITHUB_API_URL = "https://api.github.com";

const mood = command({
  name: "mood",
  options: {
    username: positional().desc("Github username to visualize mood").required(),
    status: boolean("status").alias("s").desc("Show full mood status"),
  },
  handler: async (opts) => {
    try {
      const response = await fetch(`${GITHUB_API_URL}/users/${opts.username}/events`);
      if (!response.ok) {
        switch (response.status) {
          case 404:
            throw new Error(`User ${opts.username} not found`);
          default:
            throw new Error(`Failed to fetch GitHub events for ${opts.username}`);
        }
      }

      const data = await response.json() as GitHubEvent[];
      const commits: Commit[] = data.flatMap(event =>
        event.type === "PushEvent" ? event.payload.commits : []
      );

      const mood: MoodCount = { happy: 0, angry: 0, sad: 0 };

      commits.forEach(commit => {
        const message = commit.message.toLowerCase();
        (Object.entries(words) as [keyof MoodCount, string[]][]).forEach(([moodName, moodWords]) => {
          if (moodWords.some(word => message.includes(word))) {
            mood[moodName]++;
          }
        });
      });

      const dominantMood = Object.entries(mood).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as keyof MoodCount;

      if (mood[dominantMood] > 0) {
        const phrase = moodPhrases[dominantMood][Math.floor(Math.random() * moodPhrases[dominantMood].length)];
        console.log(phrase.replace("<username>", opts.username));
      } else {
        console.log(`${opts.username} has a neutral mood.`);
      }

      if (opts.status) {
        console.log(mood);
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  },
});

export default mood;

interface MoodCount {
  happy: number;
  angry: number;
  sad: number;
}

interface Commit {
  message: string;
}

interface GitHubEvent {
  type: string;
  payload: { commits: Commit[] };
}

const words: Record<keyof MoodCount, string[]> = {
  happy: [
    "feat", "feat:", "improve", "enhance", "success", "great", "awesome", "yay",
    "refactor", "win", "resolved", "cool", "completed", "merge", "feature",
    "update", "add", "🎉", "🚀", "✨"
  ],
  angry: [
    "bug", "fail", "issue", "wtf", "fix", "broken", "crash", "urgent",
    "patch", "hotfix", "retry", "debug", "oops", "ugh", "damn", "🔥", "💢"
  ],
  sad: [
    "deprecated", "remove", "revert", "rollback", "loss", "missing",
    "bad", "unfortunate", "obsolete", "drop", "😭", "😢", "💀"
  ]
};

const moodPhrases: Record<keyof MoodCount, string[]> = {
  happy: [
    "<username> seems to be in a good mood today! 🎉",
    "<username>, keep up the good work! 🚀",
    "<username> is doing great! 😃"
  ],
  angry: [
    "<username> seems to be a bit angry today. 😡",
    "<username>, don't worry, we all have bad days. 💢",
    "<username>, take a deep breath and keep going. 🔥"
  ],
  sad: [
    "<username> seems to be a bit sad today. 😢",
    "<username>, don't worry, we all have bad days. 💙",
    "<username>, take a deep breath and keep going. 💀"
  ]
};
