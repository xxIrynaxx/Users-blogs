'use strict';

/**
 * @param {string[]} users
 * @return {promise}
 */

const getUserBlog = userId =>
  fetch(`https://api.github.com/users/${userId}`).then(response =>
    response.json()
  );

export const getUsersBlogs = async arrOfUsers => {
  const arrOfPromise = arrOfUsers.reduce((acc, user) => {
    return [...acc, getUserBlog(user)];
  }, []);

  const allUsers = await Promise.all(arrOfPromise);
  const arrOfLinks = allUsers.map(({ blog }) => blog);
  return arrOfLinks;
};

// examples
getUsersBlogs(['google', 'facebook', 'reactjs']).then(linksList =>
  console.log(linksList)
); // ==> ["https://opensource.google/", "https://opensource.fb.com", "https://reactjs.org"]
getUsersBlogs(['microsoft']).then(linksList => console.log(linksList)); // ==> ["https://opensource.microsoft.com"]
