let userTable = document.querySelector(".user-table");
let loader = true;
let popup = document.querySelector(".popup");
let modal = document.querySelector(".popup .user-table-modal");
let searchInput = document.querySelector("#search");
let icon = document.querySelector(".cursor i");
let filterByLoan = document.querySelector("input[name='checkbox']")

// ____________________________________________________________________________________


const users = [];
let newArr = [];


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


  filterByLoan.addEventListener("click", (e)=> {

      if(!e.target.classList.contains("checked")){
        e.target.classList.add("checked")
      }
      else
      e.target.classList.remove("checked")
      

      if(e.target.classList.contains("checked")){
        filterActive()
      }
      else {
        userTable.innerHTML = ""
        fetched.forEach((item, key) => {
            users.push(item)
          //   checkPercent(item)
            userTable.innerHTML += `
              <tr class="trow-main trow-${item.name}">
                  <td>
                      <figure>
                          <img src="${item.img}" alt="Image" width=50>
                      </figure>
                  </td>
                  <td>${item.name}</td>
                  <td>${item.surname}</td>
                  <td>${item.salary.value + " " + item.salary.currency}</td>
                  <td>${isActiveLoan(item)}</td>
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
      }
      
  })
  searchForName()
  
  fetched.forEach((item, key) => {
      users.push(item)
    //   checkPercent(item)
      userTable.innerHTML += `
        <tr class="trow-main trow-${item.name}">
            <td>
                <figure>
                    <img src="${item.img}" alt="Image" width=50>
                </figure>
            </td>
            <td>${item.name}</td>
            <td>${item.surname}</td>
            <td>${item.salary.value + " " + item.salary.currency}</td>
            <td>${isActiveLoan(item)}</td>
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
            <td>${isActiveLoan(item)}</td>
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
        result += item.loans[i].perMonth.value
    }

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
        result += item.loans[i].perMonth.value
    }

    return result + ` ${item.loans[0].perMonth.currency}`;
}

const isActiveLoan = (item) => {
    let isActive = false;
    for (let i = 0; i < item.loans.length; i++) {
        if(!item.loans[i].closed) {
            isActive = true;
            return "Yes";
        }
    }

    return "No"
}

const filterActive = ()=> {
   
    // if(filterByLoan.classList.contains("checked")){
        users.forEach((item, key)=> {
            let isActive = false;
            for (let i = 0; i < item.loans.length; i++) {
                if(!item.loans[i].closed) {
                    isActive = true;
                    newArr.push(item)
                }
            }
            document.querySelectorAll(".trow-main").forEach(trow=>trow.classList.add("d-none"));
            newArr.forEach(item=>{
            // document.querySelector(".error-message").classList.add("d-none");
            return document.querySelector(`.trow-${item.name}`).classList.remove("d-none");
            })

            if(!filterByLoan.classList.contains("checked")){
                newArr.pop(item)
            }
       })
    // }
   
}

const searchForName = ()=> {
    document.querySelector("#form").addEventListener("submit", (e)=> {
        e.preventDefault();
        let userSearched = [];
        document.querySelectorAll(".trow-main").forEach(trow=>trow.classList.add("d-none"))
        document.querySelector(".error-message").classList.remove("d-none");

        users.map((item, key)=> {
            if(item.name.toLowerCase().includes(searchInput.value.toLowerCase()) || item.surname.toLowerCase().includes(searchInput.value.toLowerCase())){
                document.querySelector(`.trow-${item.name}`).classList.add("w-100")
            document.querySelector(".error-message").classList.add("d-none");
                return document.querySelector(`.trow-${item.name}`).classList.remove("d-none");
            }
        })
    })
}

const modalTable = (key)=>{
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

