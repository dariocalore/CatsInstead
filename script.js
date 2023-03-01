(async ()=>{

   let btapply = document.getElementById('btapply');
   let btreset = document.getElementById('btreset');
   let tag_input = document.getElementById('tag');
   let tag;

   chrome.storage.local.get(["key"]).then((result) => {
      if(typeof result.key === 'undefined'){
         tag_input.value = " ";
      }
      else{
         tag_input.value = result.key;
      }
   });

   btapply.addEventListener("click",()=>{
      tag = tag_input.value;
      chrome.storage.local.set({ key: tag }).then(() => {
         console.log("Value is set to " + tag);
      });
   });
   btreset.addEventListener("click",()=>{
      chrome.storage.local.set({ key: null }).then(() => {
         console.log("Value is set to null");
         tag_input.value = "";
      });
   });

})();
