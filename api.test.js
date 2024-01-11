const API = require('./api');

/**
 * Helper function to generate random text for creating new tasks.
 * @param {number} l - How long the generated text should be (default 10).
 * @returns {string} A randomly-generated string of length `l`.
 */
function generateRandomText(l=10) {
    const characters = 'ABCDEFabcdef0123456789';
    let result = '';
    for (let i = 0; i < l; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

/**
 * Helper function to generate random date for creating new tasks.
 * @param {string|null} year - Specify a year (default null).
 * @param {string|null} month - Specify a month (default null).
 * @param {string|null} date - Specify a date (default null).
 * @returns {string} A randomly-generated string representation of a date.
 */
function generateRandomDate(year=null, month=null, date=null) {
    if (!year) {
      year = Math.floor(Math.random() * (2025 - 2000 + 1) + 2000).toString();
    }
    if (!month) {
      month = (Math.floor(Math.random() * 12) + 1).toString();
    }
    if (!date) {
      date = (Math.floor(Math.random() * 28) + 1).toString();
    }
    return `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}:T00:00:00.000Z`;
}

// Use these values to test each server
// TODO: update the cookie values with your own
const {baseUrl, cookie} = {baseUrl: 'https://megatron.itc210.net:1337', cookie: 's%3AWjbiR66ZjFMRqN7bZes8t81KtkkqFgQ3.NpS23wd2DUjAk%2FaUYTaMOMVgfngokOUM0DzAl2cLS9E'}; // For s1
//const {baseUrl, cookie} = {baseUrl: 'https://s2.cf-itc210.net', cookie: 's%3AtHKxQysiy4fAxpc_bieF9IqpPqy11x8l.PddRBM8vJnbp5XZqX6Uub9SNbc%2FWekfF7PzDQCOsorg'}; // For s2
//const {baseUrl, cookie} = {baseUrl: 'https://s3.cf-itc210.net', cookie: 's%3AtHKxQysiy4fAxpc_bieF9IqpPqy11x8l.PddRBM8vJnbp5XZqX6Uub9SNbc%2FWekfF7PzDQCOsorg'}; // For s3
//const {baseUrl, cookie} = {baseUrl: 'https://megatron.itc210.net:1337', cookie: 's%3AtHKxQysiy4fAxpc_bieF9IqpPqy11x8l.PddRBM8vJnbp5XZqX6Uub9SNbc%2FWekfF7PzDQCOsorg'}; // For s4


// Tests for the API
describe('API Tests', () => {
    let api = new API(baseUrl);

    test('CREATE', async () => {
        // Test if creating a task is successful.
        const Text = generateRandomText();
        const Date = generateRandomDate();
        let response = await api.createTask(cookie, Text, Date);
        expect(response.ok).toBe(true);
        let task = await response.json();

        // Verify that the response data is as expected
        expect(task.Text).toEqual(Text);
        expect(task.Date).toEqual(Date);
        expect(task.Done).toBe(false);
        expect(task).toHaveProperty('UserId');

        // Cleanup - delete the created task
        await api.deleteTask(cookie, task._id);
    });

    test('READ ONE', async () => {
        // TODO: implement the Read One test here
        const Text = generateRandomText();
        const Date = generateRandomDate();
        let response = await api.createTask(cookie, Text, Date);
        expect(response.ok).toBe(true);
        let task = await response.json();

        // Read the task
        response = await api.readTask(cookie, task._id);
        expect(response.ok).toBe(true);
        let readTask = await response.json();

        // Verify that the response data is as expected
        expect(readTask.Text).toEqual(Text);
        expect(readTask.Date).toEqual(Date);
        expect(readTask.Done).toBe(false);
        expect(readTask).toHaveProperty('UserId');

        // Cleanup
        api.deleteTask(cookie, task._id);
    });
    
    test('READ ALL', async () => {
        // Create multiple tasks first to read them later
        const tasksToCreate = 3;
        const createdTasks = [];
        for (let i = 0; i < tasksToCreate; i++) {
            const Text = generateRandomText();
            const Date = generateRandomDate();
            const createResponse = await api.createTask(cookie, Text, Date);
            expect(createResponse.ok).toBe(true);
            const createdTask = await createResponse.json();
            createdTasks.push(createdTask);
        }
    
        // Read all tasks
        const readResponse = await api.readAllTasks(cookie);
        expect(readResponse.ok).toBe(true);
        const tasks = await readResponse.json();
    
        // Verify that all tasks belong to the same user
        tasks.forEach(task => {
            expect(task.UserId).toEqual(createdTasks[0].UserId);
        });
    
        // Cleanup - delete the created tasks
        for (const task of createdTasks) {
            await api.deleteTask(cookie, task._id);
        }
    });
    

    test('UPDATE', async () => {
        // Create a task first to update it later
        const Text = generateRandomText();
        const Date = generateRandomDate();
        const createResponse = await api.createTask(cookie, Text, Date);
        expect(createResponse.ok).toBe(true);
        const createdTask = await createResponse.json();
    
        // Update the task
        const updatedDoneStatus = true;
        const updateResponse = await api.updateTask(cookie, createdTask._id, updatedDoneStatus);
        expect(updateResponse.ok).toBe(true);
    
        // Read the updated task
        const readResponse = await api.readTask(cookie, createdTask._id);
        expect(readResponse.ok).toBe(true);
        const updatedTask = await readResponse.json();
    
        // Verify that the task's Done status is updated
        expect(updatedTask.Done).toEqual(updatedDoneStatus);
    
        // Cleanup - delete the created task
        await api.deleteTask(cookie, createdTask._id);
    });
    

    test('DELETE', async () => {
        // Create a task first to delete it later
        const Text = generateRandomText();
        const Date = generateRandomDate();
        const createResponse = await api.createTask(cookie, Text, Date);
        expect(createResponse.ok).toBe(true);
        const createdTask = await createResponse.json();
    
        // Delete the task
        const deleteResponse = await api.deleteTask(cookie, createdTask._id);
        expect(deleteResponse.ok).toBe(true);
    
        // Try to read the deleted task
        const readResponse = await api.readTask(cookie, createdTask._id);
        expect(readResponse.ok).toBe(false);
    });
    
    test('READ USER', async () => {
        // Read the current user's data
    let response = await api.readCurrentUser(cookie);
        expect(response.ok).toBe(true);
        let user = await response.json();

        //verify that the response data is as expected 
        expect(user).toHaveProperty('Id');
        expect(user).toHaveProperty('UserName');
        expect(user).toHaveProperty('Email');
    });
    

    test('READ ONE NONEXISTENT', async () => {
        // Test reading a non-existent task
        const fakeId = '0123456789abcdef01234567'; // 24 hex characters
        let response = await api.readTask(cookie, fakeId);
        expect(response.status).toBe(404);
    });

    test('DELETE NONEXISTENT', async () => {
        // Test deleting a non-existent task
        const fakeId = '0123456789abcdef01234567'; // 24 hex characters
        let response = await api.deleteTask(cookie, fakeId);
        expect(response.status).toBe(404);
    });

    test('UPDATE NONEXISTENT', async () => {
        // Test updating a non-existent task
        const fakeId = '0123456789abcdef01234567'; // 24 hex characters
        let response = await api.updateTask(cookie, fakeId, true);
        expect(response.status).toBe(404);
    });

    test('DELETE INVALID ID', async () => {
        // Test deleting a task with an invalid ID
        const invalidId = '0123456789abcdef0123456'; // 23 hex characters
        let response = await api.deleteTask(cookie, invalidId);
        expect(response.status).toBe(500);
    });

    test('READ ALL NO COOKIE', async () => {
        // Test reading all tasks without providing a cookie (not logged in)
        let response = await api.readAllTasks('');
        expect(response.status).toBe(401);
    });

    test('CREATE NOT ENOUGH DATA', async () => {
        // Test creating a task without providing enough data
        let response = await api.createTask(cookie, 'Incomplete Task', '');
        expect(response.status).toBe(500);
    });
});