import CONFIG from "./config.js";

console.log("api.js (local) module loaded.");

export async function getTimer() {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}userDetailes/timer.php`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Timer API Error:", error);
        return { success: false };
    }
}

export async function getBalance(username) {
    try {
        const url = username ? `${CONFIG.BASE_URI}userDetailes/balance.php?username=${username}` : `${CONFIG.BASE_URI}userDetailes/balance.php`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Balance API Error:", error);
        return { success: false };
    }
}

export async function login(username, password) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}userDetailes/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Login API Error:", error);
        return { success: false, message: "Network Error" };
    }
}

export async function logout(userId) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}userDetailes/logout.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Logout API Error:", error);
        return { success: false };
    }
}

export async function changePassword(userId, oldPass, newPass, confirmPass) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}userDetailes/changePassword.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_id: userId, 
                old_pass: oldPass, 
                new_pass: newPass, 
                confirm_pass: confirmPass 
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Change Password API Error:", error);
        return { success: false, status: false, message: "Network Error" };
    }
}

export async function result(){
    try{
        const response = await fetch(`${CONFIG.BASE_URI}read/result.php`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Result API Error:", error);
        return { success: false };
    }
}

export async function getResultDateWise(date){
    try{
        const response = await fetch(`${CONFIG.BASE_URI}read/resultDateWise.php?record_date=${date}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Result Date Wise API Error:", error);
        return { status: false, results: [] };
    }
}

export async function insertData(payload) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}read/insertData.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Insert Data API Error:", error);
        return { status: false, message: "Network Error" };
    }
}

export async function getAdvanceDrawTime() {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}read/advancDrawTime.php`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Advance Draw Time API Error:", error);
        return { status: false, slots: [] };
    }
}

export async function getLastDrawAmount(username) {
    try {
        const url = username ? `${CONFIG.BASE_URI}read/lastDrawAmount.php?username=${username}` : `${CONFIG.BASE_URI}read/lastDrawAmount.php`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Last Draw Amount API Error:", error);
        return { status: false, last_bet_amount: 0 };
    }
}

export async function getBetHistory(username, date) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}read/betHistory.php?username=${username}&record_date=${date}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Bet History API Error:", error);
        return { status: false, tickets: [] };
    }
}

export async function cancelTicket(id) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}read/cancleTicket.php?id=${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Cancel Ticket API Error:", error);
        return { status: false, message: "Server Error" };
    }
}

export async function getPrintDetails(barcode, username) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}read/PrintTickets.php?barcodee=${barcode}&username=${username}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Print Details API Error:", error);
        return { status: false, tickets: [] };
    }
}

export async function getCurrentDrawBetHistory(username){
    try{
        const response = await fetch(`${CONFIG.BASE_URI}read/currentDrawBetHistory.php?username=${username}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Current Draw Bet History API Error:", error);
        return { status: false, tickets: [] };
    }
}

export async function getGameWiseReport(username, first_date, last_date) {
    try {
        const response = await fetch(`${CONFIG.BASE_URI}read/GameWiseReport.php?username=${username}&first_date=${first_date}&last_date=${last_date}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Game Wise Report API Error:", error);
        return { status: false, grand_totals: {} };
    }
}