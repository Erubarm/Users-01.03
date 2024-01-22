const itemsList = document.querySelector(".items-list");
const buttonFilter = document.querySelector(".filtered");
document.body.onload = () => {
    setTimeout( () => {
        const preloader = document.querySelector('.preloader');
        if ( !preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
        }
    }, 1500);
}

const filterImg = document.querySelector('.filtered__img')
console.log(filterImg.classList)
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
      name: user.name,
      email: user.email,
      company: user.company.name,
      userId: user.id,
    };
  });

  const outputUsers = () => {
    filteredUsers.forEach((user) => {
      itemsList.innerHTML += `
            <li>
                <div class="user__avatar"></div>
                <div class="user__description">
                  <h2 class="user__name"><a href="./userProfile.html?userId=${user.userId}">${user.name}</a></h2>
                  <span class="user__company normal">${user.company}</span>  
                  <span class="user__email small">${user.email}</span>
                </div>
            </li>
        `;
    });
  };
  outputUsers();

  buttonFilter.addEventListener("click", () => {
    if (!filterImg.classList.contains('rotate') ) {
      filterImg.classList.add('rotate')
      filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
      itemsList.innerHTML = ``;
      outputUsers();
    } else {
      filterImg.classList.remove('rotate');
      filteredUsers.reverse();
      itemsList.innerHTML = ``;
      outputUsers();
    }
  });
};
Actions();
