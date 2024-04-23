// const callback = ({apiStatus, data, message}) => {
//     if(apiStatus === 'loading'){
//       setshowLoader(true);
//     }else if(apiStatus === 'error'){
//       setshowLoader(false);
//       setoutput("something went wrong");
//     }
//     else{
//       setshowLoader(false);
//       if(data.status.id === 3){
//         setoutput(atob(data.stdout))
//       }
//       else{
//         setoutput(atob(data.stderr))
//       }
//     }
//   } 
  

// const runCode = useCallback(({code, language}) => {
//     makeSubmission({ code, language,input, callback });
//   }, [input]);






//   const languageCodeMap = {
//     cpp: 54,
//     python: 92,
//     javascript: 93,
//     java: 91,
//   };
  
//   export async function makeSubmission({ code, language, callback, stdin }) {
//     const url =
//       "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
//     const languageId = languageCodeMap[language];
    
//     if (languageId === undefined) {
//       callback({ apiStatus: "error", message: "Invalid language" });
//       return;
//     }
    
//     const httpOptions = {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         "X-RapidAPI-Key": "8d78832849mshfdb48d4277ad998p1339d9jsnc7a249530754",
//         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//       },
//       body: JSON.stringify({
//         language_id: languageId,
//         source_code: btoa(code),
//         stdin: btoa(stdin),
//       }),
//     };
//     try {
//       callback({ apiStatus: "loading" });
//       const response = await fetch(url, httpOptions);
//       const result = await response.json();
//       const tokenId = result.token;
//       let statusCode = 1;
//       let apiSubmissionResult;
//       while (statusCode === 1 || statusCode === 2) {
//         try {
//            apiSubmissionResult = await getSubmission(tokenId);
//           statusCode = apiSubmissionResult.status.id;
//         } catch (error) {
//           callback({ apiStatus: "error", message: JSON.stringify(error) });
//           return;
//         }
//       }
//       if(apiSubmissionResult){
//         callback({apiStatus: 'success', data: apiSubmissionResult})
//       }
      
  
//     } catch (error) {
//       callback({
//         apiStatus: "error",
//         message: JSON.stringify(error),
//       });
//     }
//   }
  
//   export async function getSubmission(tokenId) {
//     const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
//     const options = {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "8d78832849mshfdb48d4277ad998p1339d9jsnc7a249530754",
//         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//       },
//     };
  
//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   }
  