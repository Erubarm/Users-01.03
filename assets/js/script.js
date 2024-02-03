const itemsList = document.querySelector(".items-list");
const buttonFilter = document.querySelector(".filtered");
const username = document.getElementById("username");
const userFind = document.getElementById("userFind");
const pageUrl = window.location.search;
const numberPage = pageUrl.split('=')[1];
console.log(numberPage);
const sortAtoZ = document.getElementById("sortAtoZ");
const buttonsPage = document.querySelector('.buttons-page');
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


const Actions = async () => {
    const userList = await getUsers();

    let filteredUsers = userList.map((user) => {
        return {
            name: user.name,
            email: user.email,
            company: user.company.name,
            userId: user.id,
        };
    });
    console.log(filteredUsers)
    // const


    const searchUser = (username) => {
        const filters = filteredUsers.filter((user) =>
            user.name.includes(username)
        );
        filters.forEach((user) => {
            itemsList.innerHTML += `
            <li class="li-item">
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
        }
        ;
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
    const pagination = () => {
        let page = 1;
        for (let i = 1; i <= filteredUsers.length; i++) {
            if (i % 2 != 0) {
                buttonsPage.innerHTML += `
            <a href='./index.html?page=${page}'>${page}</a>
          `;
            } else {
                page++;
            }
        }
    }
    pagination();
    console.log(filteredUsers)

    // buttonsPage.addEventListener('click', (btn) => {
    //     btn.classList.add('active')
    // })

    const outputUsers = () => {
        filteredUsers.forEach((user, index) => {
            index +=1
            if ( (index == numberPage*2-1) || (index == numberPage*2)) {
                itemsList.innerHTML += `
                <li class='li-item'>
                    <div class="user__avatar"></div>
                    <div class="user__description">
                      <h2 class="user__name"><a href="./userProfile.html?userId=${user.userId}">${user.name}</a></h2>
                      <span class="user__company normal">${user.company}</span>  
                      <span class="user__email small">${user.email}</span>
                    </div>
                </li>
                `;
            }




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


