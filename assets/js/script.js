const itemsList = document.querySelector('.items-list');
const buttonFilter = document.querySelector('.button__filter');




const getUsers = async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    return users.json();
};
const getPosts = async () => {
    posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    return posts.json();
};

const Actions = async () => {
    const userList = await getUsers();
    const postList = await getPosts();

    let filteredUsers = userList.map(user => {
        return {
            name: user.name,
            email: user.email,
            company: user.company.name,
            userId: user.id,
        }
    });

    const outputUsers = filteredUsers.forEach(user => {
        itemsList.innerHTML += `
            <li>
                <h1><a href="../userProfile.html?userId=${user.userId}">${user.name}</a></h1>
                <span>${user.email}</span>
                <span>${user.company}</span>   
            </li>
        `
    });
    
    buttonFilter.addEventListener('click', () => {
        if (buttonFilter.innerText == 'A-Z') {
            buttonFilter.innerText = 'Z-A';
            
        } else {
            buttonFilter.innerText = 'A-Z';
        }
    });
};
Actions();







