let userTable = document.querySelector(".user-table");
let loader = true;
let popup = document.querySelector(".popup");
let modal = document.querySelector(".popup .user-table-modal");
let searchInput = document.querySelector("#search");
let icon = document.querySelector(".cursor i");

// ____________________________________________________________________________________


const users = [];

const closePopup = () => {
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
  popup.style.transition = "all 0.5s";
  modal.classList.remove("animate__fadeInDown");
  modal.innerHTML = ``
};

const Main = async () => {
  let response = await fetch("./js/data.json");
  let fetched = await response.json();
  let isClosed = false;
  
  fetched.forEach((item, key) => {
      users.push(item)
    //   checkPercent(item)
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
            <td>${totalPay(item)}</td>
            <td>${checkPercent(item)}</td>
            <td><button type="button" data-id="${key}" class="btn btn-success detailBtn">Show Details</button></td>
        </tr>
    `;

    document.querySelector(".cursor .fa-sort-alpha-down").addEventListener("click", ()=> {
        if(icon.classList.contains("fa-sort-alpha-down")){
            sortedList()
            icon.remove()
            // icon.classList.add("fa-sort-alpha-up")
        }
    })


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


const sortedList = ()=> {
    users.sort(function(a, b){
      if(a.name < b.name) { return -1; }
  })

    userTable.innerHTML = ``;

    users.forEach((item, key)=> {
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
            <td>${totalPay(item)}</td>
            <td>${checkPercent(item)}</td>
            <td><button type="button" class="btn btn-success detailBtn">Show Details</button></td>
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
    })
}

const checkPercent = (item)=> {
    let calc = 0;
    let result = 0;
    let dueAmount = 0;
    calc = item.salary.value * 45 / 100;
    
    for (let i = 0; i < item.loans.length; i++) {
        console.log("Item: ", item.name +  " 1- " + item.loans[i].perMonth.value);
        result += item.loans[i].perMonth.value
    }

    console.log("Res: ", result, " Calc: ", calc);

    if(result > calc){
        return "No"
    }
    else {
        return "Yes"
    }
}

const totalPay = (item)=> {
    let calc = 0;
    let result = 0;
    let dueAmount = 0;
    calc = item.salary.value * 45 / 100;
    
    for (let i = 0; i < item.loans.length; i++) {
        console.log("I: ", item.name +  " - " + item.loans[i].perMonth.value);
        result += item.loans[i].perMonth.value
    }

    return result + ` ${item.loans[0].perMonth.currency}`;
}

const sortedListZtoA = ()=> {
    users.sort(function(a, b){
      if(a.name < b.name) { return 1; }
      if(a.name > b.name) { return -1; }
      return 0;
  })

  console.log("us", users);
    userTable.innerHTML = ``;
    // document.querySelector(".cursor .fa-sort-alpha-up").addEventListener("click", ()=> {
    //     if(icon.classList.contains("fa-sort-alpha-up")){
    //         icon.classList.remove("fa-sort-alpha-up")
    //         icon.classList.add("fa-sort-alpha-down")
    //     }
    // })
}

const modalTable = (key)=>{
    console.log("ke", key);
    console.log("key: ", users[key].surname);
    users[key].loans.forEach((elem, index)=> {
        document.querySelector(".image-user").setAttribute("src", `${users[key].img}`)
        document.querySelector(".name-surname").innerHTML = `${users[key].name + " " + users[key].surname}`
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

Main();

