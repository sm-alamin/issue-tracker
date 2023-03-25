document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  e.preventDefault(); // prevent form submission and page reload
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  let issues = JSON.parse(localStorage.getItem('issues')); 
  const currentIssue = issues.find(issue => issue.id === id);
  if(currentIssue.status !== 'Closed'){ 
    const remainingIssues = issues.filter(issue => issue.id !== id );
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
  }else{
    issues = issues.filter(issue => issue.id !== id );
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a> <!-- fix: pass id as string -->
                              <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a> <!-- fix: pass id as string -->
                              </div>`;
  }
}
