let userTable = document.querySelector(".user-table");
let loader = true;
let popup = document.querySelector(".popup");
let modal = document.querySelector(".popup .user-table-modal");
let searchInput = document.querySelector("#search");

// ____________________________________________________________________________________

const link = "https://api.npoint.io/ec21414b0e15972dbfde/data";
const users = [];

const closePopup = () => {
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
  popup.style.transition = "all 0.5s";
  modal.classList.remove("animate__fadeInDown");
  modal.innerHTML = ``
};

const Main = async () => {
    // searchUser();
  let response = await fetch("./js/data.json");
  let fetched = await response.json();
  let isClosed = false;
  fetched.forEach((item, key) => {
      users.push(item)
    userTable.innerHTML += `
            <tr>
                <td>
                    <figure>
                        <img src="${item.img}" alt="Image" width=50>
                    </figure>
                </td>
                <td>${item.name}</td>
                <td>${item.surname}</td>
                <td>${item.salary.value + " " + item.salary.currency}</td>
                <td><button type="button" data-id="${key}" class="btn btn-success detailBtn">Show Details</button></td>
            </tr>
           `;

    document.querySelectorAll(".detailBtn").forEach((userBtn, index) => {
      userBtn.addEventListener("click", () => {
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
        popup.style.transition = "all 0.5s";
        modal.classList.add("animate__fadeInDown");
        modalTable(index)

      });
    });

    
  });

  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      closePopup();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  });
};

const modalTable = (key)=>{
    console.log("ke", key);
    console.log("key: ", users[key].surname);
    users[key].loans.forEach((elem, index)=> {
        document.querySelector(".name-surname").innerHTML = `${users[key].name + " " + users[key].surname}`
        console.log("nm sn",users[key]?.name + " " + users[key]?.surname);
         modal.innerHTML += `
            <tr>
                <td>${elem.loaner}</td>
                <td>${elem.amount.value + " " + elem.amount.currency}</td>
                <td>${elem.period?.value + " " + elem.period?.type}</td>
                <td>${elem.closed ? "No" : "Yes"}</td>
                <td>${elem.perMonth ? elem?.perMonth?.value + " " + elem?.perMonth?.currency : "There is no loan"}</td>
                <td>${elem?.dueAmount?.value !== 0 ? elem?.dueAmount?.value + " " + elem?.dueAmount?.currency : " There is no loan "}</td>
                <td>${elem?.loanPeriod?.start + " - " + elem?.loanPeriod?.end}</td>
            </tr>
           `;
    })
}

// const searchUser = ()=> {

//     document.querySelector("#search").addEventListener("keydown", (e)=> {

//         users.forEach((item, key)=> {
//             if(item.name?.includes(e.target.value)){
//             }
//         })
//     })
// }





Main();
