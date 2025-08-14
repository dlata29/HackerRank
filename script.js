// -------------------------
// Mock API Functions
// -------------------------
function randomDelay(min = 500, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFail(chance = 0.1) {
  return Math.random() < chance;
}

function getUserData(userId) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    setTimeout(() => {
      if (randomFail()) return reject(`❌ Failed to fetch user data for ID ${userId}`);
      resolve({ id: userId, name: `User_${userId}` });
    }, delay);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    setTimeout(() => {
      if (randomFail()) return reject(`❌ Failed to fetch posts for User ${userId}`);
      if (Math.random() < 0.5) return resolve([]); // Some users have no posts
      resolve([
        { id: `post_${userId}_1`, title: `Post 1 by User_${userId}` },
        { id: `post_${userId}_2`, title: `Post 2 by User_${userId}` },
      ]);
    }, delay);
  });
}

function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();
    setTimeout(() => {
      if (randomFail()) return reject(`❌ Failed to fetch comments for Post ${postId}`);
      resolve([
        { id: `comment_${postId}_1`, text: `Comment 1 on ${postId}` },
        { id: `comment_${postId}_2`, text: `Comment 2 on ${postId}` },
      ]);
    }, delay);
  });
}

// -------------------------
// Solution Functions
// -------------------------
async function loadUserProfile(userId) {
  try {
    const user = await getUserData(userId);
    const posts = await getUserPosts(user.id);
    const comments = posts.length > 0 ? await getPostComments(posts[0].id) : [];
    return { user, posts, comments };
  } catch (err) {
    console.error(`Error loading profile for User ${userId}:`, err);
    return null; // return null if profile fails
  }
}

async function loadMultipleProfiles(userIds) {
  const profilePromises = userIds.map((id) => loadUserProfile(id));
  const profiles = await Promise.all(profilePromises);
  // Filter out null profiles (failed ones)
  return profiles.filter((p) => p !== null);
}

// -------------------------
// Test Calls
// -------------------------
(async function test() {
  console.log("🚀 Starting tests...\n");

  const singleProfile = await loadUserProfile(1);
  console.log("✅ Single Profile Loaded:", singleProfile);

  const multipleProfiles = await loadMultipleProfiles([1, 2, 3, 4]);
  console.log("\n✅ Multiple Profiles Loaded:", multipleProfiles);
})();
