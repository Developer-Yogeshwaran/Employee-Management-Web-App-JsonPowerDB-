/*
  Minimal jpdb-commons.js helper for JsonPowerDB AJAX calls.
  This lightweight helper provides functions to create requests and execute them via AJAX.
  NOTE: Replace TOKEN placeholder in index.js with your JPDB token before running.
*/
(function(global){
  const BASE_URL = "http://api.login2explore.com:5577";
  const API_PATH = "/api/irl"; // JsonPowerDB REST endpoint

  function executeCommand(requestObj, onSuccess, onError){
    $.ajax({
      url: BASE_URL + API_PATH,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestObj),
      success: function(res){ if(onSuccess) onSuccess(res); },
      error: function(xhr){ if(onError) onError(xhr); }
    });
  }

  function createPUTRequest(token, dbName, relName, jsonObj){
    return {
      token: token,
      cmd: 'PUT',
      dbName: dbName,
      rel: relName,
      jsonStr: JSON.stringify(jsonObj)
    };
  }

  function createGETRequest(token, dbName, relName, keyObj){
    return {
      token: token,
      cmd: 'GET',
      dbName: dbName,
      rel: relName,
      jsonStr: JSON.stringify(keyObj)
    };
  }

  function createUPDATERequest(token, dbName, relName, oldKeyObj, newObj){
    return {
      token: token,
      cmd: 'UPDATE',
      dbName: dbName,
      rel: relName,
      oldRec: JSON.stringify(oldKeyObj),
      newRec: JSON.stringify(newObj)
    };
  }

  function createREMOVERequest(token, dbName, relName, keyObj){
    return {
      token: token,
      cmd: 'REMOVE',
      dbName: dbName,
      rel: relName,
      jsonStr: JSON.stringify(keyObj)
    };
  }

  // Expose helper under global.jpdb
  global.jpdb = {
    executeCommand,
    createPUTRequest,
    createGETRequest,
    createUPDATERequest,
    createREMOVERequest
  };

})(window);
