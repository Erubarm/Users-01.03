const userTitle = document.querySelector('.userTitle');
const userPostsList = document.querySelector('.user__posts-list');
const userUrl = window.location.search;
const userId = userUrl.split("=")[1];
let userInfo;
let userPosts;




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
            id: user.id, name: user.name, username: user.username, email: user.email, city: user.address.city, telephone: user.phone,
            website: user.website,company: user.company.name,
        }
    })
    userInfo = filteredUsers.filter(user => user.id == userId)[0];
    console.log(userInfo)

    let filteredPosts = postList.map(post => {
        return {
            userId: post.userId,
            body: post.body,
        }
    })
    userPosts = filteredPosts.filter(post => post.userId == userId);
    console.log(userPosts);

    userTitle.innerHTML += `
        <h1>${userInfo.name}</h1>
        <span>${userInfo.username}</span>
        <span>${userInfo.city}</span>
        <span>${userInfo.telephone}</span>
        <span>${userInfo.email}</span>
        <span>${userInfo.website}</span>
        <span>${userInfo.company}</span>

    `;
    
    const outputPosts = userPosts.forEach(post => {
        userPostsList.innerHTML += `
            <li>
                <p>${post.body}</p>
            </li>
        `;
    });
    
};
Actions();