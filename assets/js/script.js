const itemsList = document.querySelector(".items-list");
const buttonFilter = document.querySelector(".filtered");
const username = document.getElementById("username");
const userFind = document.getElementById("userFind");

const sortAtoZ = document.getElementById("sortAtoZ");

const sortList = document.getElementById("sort-list");

buttonFilter.addEventListener("click", () => {
  if (!filterImg.classList.contains("rotate")) {
    filterImg.classList.add("rotate");
  } else {
    filterImg.classList.remove("rotate");
  }
  sortList.classList.toggle("sort-list-hide");
});

document.body.onload = () => {
  setTimeout(() => {
    const preloader = document.querySelector(".preloader");
    if (!preloader.classList.contains("hide")) {
      preloader.classList.add("hide");
    }
  }, 1500);
};

const filterImg = document.querySelector(".filtered__img");

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

  const searchUser = (username) => {
    const filters = filteredUsers.filter((user) =>
      user.name.includes(username)
    );
    filters.forEach((user) => {
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
  
  // let usernameRight = username.value[0].toUpperCase() + username.value.slice(1);
  userFind.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
    itemsList.innerHTML = ` `;
    let usernameRight = username.value[0].toUpperCase() + username.value.slice(1);
    
    console.log(usernameRight)
    searchUser(usernameRight);
    };
  });

  username.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      if (!username.value == '') {
      let usernameRight = username.value[0].toUpperCase() + username.value.slice(1);
      itemsList.innerHTML = ` `;
      searchUser(usernameRight);
      } else {
        searchUser(username.value)
      }
    }
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

  sortAtoZ.addEventListener("click", () => {
    if (sortAtoZ.innerText === "Sort for A-Z") {
      sortAtoZ.innerText = "Sort for Z-A";
      filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
      itemsList.innerHTML = ``;
      outputUsers();
    } else {
      sortAtoZ.innerText = "Sort for A-Z";
      filteredUsers.reverse();
      itemsList.innerHTML = ``;
      outputUsers();
    }
  });
};
Actions();
