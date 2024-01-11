class API {
  /**
   * Create a new API instance.
   * @param {string} baseUrl - The base URL for API requests.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Create a new task.
   * @param {string} cookie - Pre-authorized cookie.
   * @param {string} Text - Text/description of the task.
   * @param {string} Date - Due date of the task.
   * @returns {Promise<Response>} Response from the server.
   */
  createTask(cookie, Text, Date) {
    const url = new URL('/api/v1/tasks', this.baseUrl);
    const data = { Text, Date };
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
  }

/**
 * Read all tasks.
 *
 * @param {string} cookie - Pre-authorized cookie.
 * @returns {Promise<Response>} Response from the server containing tasks.
 */

  readAllTasks(cookie) {
    // TODO: implement the readAllTasks function here
    const url = new URL('/api/v1/tasks', this.baseUrl);
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'GET',
      headers
    });
  }

/**
 * Read a task using the provided cookie and task ID.
 *
 * @param {string} cookie - The session cookie for authentication.
 * @param {number} taskId - The ID of the task to be read.
 * @returns {Promise} A Promise that resolves to the response from the server.
 */

  readTask(cookie, taskId) {
    const task = taskId.toString();
    // TODO: implement the readTask function here
    const url = new URL('/api/v1/tasks/' + task, this.baseUrl);
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'GET',
      headers
    });
  }

/**
 * Update the status of a task using the provided cookie, task ID, and status.
 *
 * @param {string} cookie - The session cookie for authentication.
 * @param {number} taskId - The ID of the task to be updated.
 * @param {boolean} Done - The new status of the task (true for done, false for not done).
 * @returns {Promise} A Promise that resolves to the response from the server indicating the success of the update.
 */

  updateTask(cookie, taskId, Done) {
    // TODO: implement the updateTask function here
    const task = taskId.toString();
    const url = new URL(`/api/v1/tasks/` + task, this.baseUrl);
    const data = { Done };
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
  }

  /**
 * Delete a task using the provided cookie and task ID.
 *
 * @param {string} cookie - The session cookie for authentication.
 * @param {number} taskId - The ID of the task to be deleted.
 * @returns {Promise} A Promise that resolves to the response from the server indicating the success of the deletion.
 */

  deleteTask(cookie, taskId) {
    // TODO: implement the deleteTask function here
    const task = taskId.toString();
    const url = new URL(`/api/v1/tasks/` + task, this.baseUrl);
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'DELETE',
      headers
    });
  }

/**
 * Read the current user's information using the provided cookie for authentication.
 *
 * @param {string} cookie - The session cookie for authentication.
 * @returns {Promise} A Promise that resolves to the response from the server containing the current user's information.
 */

  readCurrentUser(cookie) {
    // TODO: implement the readCurrentUser function here
    const url = new URL('/api/v1/user', this.baseUrl);
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `it210_session=${cookie}`
    };
    return fetch(url.toString(), {
      method: 'GET',
      headers
    });
  }
}



if (require.main === module) {
  // Here is where you can test your API methods.
  const baseUrl = 'https://s1.cf-itc210.net/';
  const cookie = 's%3AsjbEBfVMbYJePjmy3X-4fEQtiWQUcMxd.8JIACFidzZDECcm6eA6pzeIvV68R%2BbmIPPyF9Rh1wxw';
  const api = new API(baseUrl);

  /**
   * Test createTask method
   *
   * @param {string} cookie - The session cookie for authentication.
   * @param {string} title - The title of the task.
   * @param {string} dueDate - The due date of the task in 'YYYY-MM-DD' format.
   */

    // Test createTask method
    api.createTask(cookie, 'Test the API', '2023-01-01')
      .then((response) => {
        console.log('Create Task Response:');
        console.log(response.ok);
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Create Task Data:');
        console.log(data);
      })
      .catch((error) => {
        console.error('Create Task Error:');
        console.error(error);
      });
  
    }
  
  module.exports = API;
