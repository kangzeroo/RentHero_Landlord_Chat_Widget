
<script>
  // Copy and paste this file as the embedded link
 window.addEventListener('load', function(){
   var landlord = {
     id: '345945-sfg5y46y-sdfgh'
   }
   // create the root element for ReactJS
	  var root = document.createElement('div');
    // give it an id
    root.setAttribute('id', 'root')
    root.setAttribute('landlord', landlord.id)
    // style it
    // var style = document.createElement('style', "color:red; border: 1px solid blue;")
    root.setAttribute("style", "height: 100px; width: 100px; bottom: 10px; right: 10px; position: fixed; z-index: 999;");
    // now append some text inside it
    // root.append(document.createTextNode("Hi there and greetings!"))
    // append the root element to the body of the parent
    document.body.appendChild(root);
     // console.log(document.getElementById('root'))
    // create a script element and set sync and other datas
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://s3.amazonaws.com/testwidget-renthero/bundle.js';
    document.head.appendChild(script);
    // log the root file
	  // console.log(document.getElementById('root'))
  }, false);
</script>
