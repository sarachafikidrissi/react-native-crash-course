import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";





//* settting up appwrite for our application logic including database , user sign up and sign in
/**
 * to start connecting to appwrite client which will alow us to
 * create users,
 * upload videos,
 * make relations between them and
 * upload files to our storage
 */

export const appwriteConfing = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.rn.course",
  projectId: "678be042000cc6051e54",
  databaseId: "678be29f000b6be1c77e", //* our app database
  userColllectionId: "678be2b900175a05e2ef", //* id of users db where users will be stored
  videoCollectionId: "678be352003e2379df66", //* id of videos db where videos will be stored
  storageId: "678be583000ba93a902e",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userColllectionId,
  videoCollectionId,
  storageId,
} = appwriteConfing;

//^ Init your React Native SDK

const client = new Client();

client
  .setEndpoint(appwriteConfing.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfing.projectId) // Your project ID
  .setPlatform(appwriteConfing.platform); // Your application ID or bundle ID.

// console.log(client.config.endpoint);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// const result = await account.listSessions();

// console.log(result);

//* Register User
export const createUser = async (email, password, username) => {
  // account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
  //     .then(function (response) {
  //         console.log(response);
  //     }, function (error) {
  //         console.log(error);
  //     });
  try {
    //^ 1- create an account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    //^ 2- create an avatar
    const avatarUrl = avatars.getInitials(username);

    //^ 3- sign in the user
    await signIn(email, password);

    //^ 4- create new instance of the user in the database

    const newUser = await databases.createDocument(
      appwriteConfing.databaseId,
      appwriteConfing.userColllectionId,
      ID.unique(), //* documentId
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      } //* data
    );

    //^ 5-return the new user

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};




//* Login User
export const signIn = async (email, password) => {
  try {
    //^ 1- establish a new user session
    const session = account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//* to get the current logged in user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    //^ if there is a current account get it from the database

    const currentUser = await databases.listDocuments(
      appwriteConfing.databaseId,
      appwriteConfing.userColllectionId,
      [Query.equal("accountId", currentAccount.$id)] // this gives us the exact user that is currently logged in
    );

    if (!currentUser) throw Error;
    //^ if there is a current user return it
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

//* Fetch data from Appwrite
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )
        return posts.documents
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

//* Function that returns the latest posts to use on trending videos section 
export const getLatestPosts = async () => {
  try {
      const posts = await databases.listDocuments(
          databaseId,
          videoCollectionId,
          [Query.orderDesc('$createdAt', Query.limit(7))] //^ this will query the data and give the 7 latest videos
      )
      return posts.documents
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
}

//* a function that returns the posts searched for based on the query passed to it 

export const searchPosts = async (query) => {
  try {
      const posts = await databases.listDocuments(
          databaseId,
          videoCollectionId,
          [Query.search('title', query)] //^ this will query the posts that there title is equal to query
      )
      if (!posts) throw new Error("Something went wrong");
      
      return posts.documents
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
}
/**
 * @returns: videos that user has created
 */
export const getUserPosts = async (userId) => {
  try {
      const posts = await databases.listDocuments(
          databaseId,
          videoCollectionId,
          [Query.equal('creator', userId)] 
      )
      if (!posts) throw new Error("Something went wrong");
      
      return posts.documents
  } catch (error) {
      console.log(error);
      throw new Error(error);
  }
}

/**
 * a function tha sign out the current user from the application
 * @returns : deleted session
 */
export const signOut = async () => {
  try {
      const session = await account.deleteSessions('current');
      return session;
  } catch (error) {
    throw new Error(error);
    
  }
}

export const createVideo = async(form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all()
  } catch (error) {
    throw new Error(error);
    
  }
}
