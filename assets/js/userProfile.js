const userTitle = document.querySelector(".user__info");
const userPostsList = document.querySelector(".user__posts-list");
const userUrl = window.location.search;
const userId = userUrl.split("=")[1];
let userInfo;
let userPosts;

document.body.onload = () => {
    setTimeout( () => {
        const preloader = document.querySelector('.preloader');
        if ( !preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
        }
    }, 1500);
}

const getUsers = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  return users.json();
};
const getPosts = async () => {
  posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  return posts.json();
};

const Actions = async () => {
  const userList = await getUsers();
  const postList = await getPosts();

  let filteredUsers = userList.map((user) => {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address.city,
      telephone: user.phone,
      website: user.website,
      company: user.company.name,
    };
  });
  userInfo = filteredUsers.filter((user) => user.id == userId)[0];
  console.log(userInfo);

  let filteredPosts = postList.map((post) => {
    return {
      userId: post.userId,
      body: post.body,
    };
  });
  userPosts = filteredPosts.filter((post) => post.userId == userId);
  console.log(userPosts);

  userTitle.innerHTML += `
    
        <div class="user-profile__head">
            <div class="user-profile__head__name-and-location">
                <h1 class="user__name">${userInfo.name}</h1>
                <span class="user__location"><img src="../assets/icons/map-location.svg" alt="place"> ${userInfo.city}</span>
            </div>
            <span class="user-profile__head__company">${userInfo.company}</span>
        </div>

        <div class="user__contact-info">
            <span class="user__contact-info__title">CONTACT INFORMATION</span>
            <span class="user__contact-info__item">Full name: <strong>${userInfo.username}</strong></span>
            <span class="user__contact-info__item">E-mail: <a href="mailto:${userInfo.email}" class="user-profile__link">${userInfo.email}</a></span>
            <span class="user__contact-info__item">Phone: <a href="tel:${userInfo.telephone}" class="user-profile__link">${userInfo.telephone}</a></span>
            <span class="user__contact-info__item">Site: <a href="${userInfo.website}" class="user-profile__link">${userInfo.website}</a></span>
        </div>

    `;

  const outputPosts = userPosts.forEach((post) => {
    userPostsList.innerHTML += `
            <li class="user__posts-item">
                <div class="user__post-item-up">
                    <div class="user__post-item-up__avatar"></div>
                    <span class="user__post-item-up__name">${userInfo.name}</span>
                </div>
                <p>${post.body}</p>
            </li>
        `;
  });
};
Actions();
