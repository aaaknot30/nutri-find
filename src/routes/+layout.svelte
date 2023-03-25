<script lang="ts">
  import '../css/styles.css'


</script>

<main>
  <header>
    <div class="header-item">
      <a class="header-title" href="/"><h1>Nutri-Find Foods</h1></a> 
    </div>
    <div class="header-item">
    <form method="POST" action="/search">
        <input
          name="searchWord"
          type="text"
          placeholder="search"
        />
        <button type="submit">Go</button>
        <a href="/nutrients">Nutrients</a>
        <a href="/">Home</a>
    </form>
  </div>
  </header>

<slot />

<footer>
  <div class="footer-item">
    <p>By Kyle Larson, 3/2023</p>

  </div>

</footer>

</main>

<style>

  
  /* * {
    border: 1px solid blue;
  } */

  main {
    width: 75%;
    margin: 0 auto;
    border: 2px solid #666;
    background-color: white;
  }

  h1 {
    padding: 0 0 .5rem 1rem;
    margin: 0;
    font-family: 'Rubik', sans-serif;
    color: white;
    font-size: 3rem;
    text-shadow: 3px 3px 2px #444;
  }

  p {
    margin: .1rem 0 1rem 0;
  }

  form {
    margin: 0 1rem 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  form a {
    color: white;
    font-weight: 700;
    margin: 0 0 0 .5rem;
    font-family: 'Rubik', sans-serif;
    text-shadow: 1px 1px 1px #444;
  }

  input[type=text] {
    width: 10rem;
    padding: .1rem 1rem;
    border-radius: 1rem;
    margin: 0 .5rem 0 0;
    border: none;
    font-family: 'Rubik', sans-serif;
    font-size: 1rem;;
  }


  /* ---------------- Section -------------- */

  footer {
    background-color: #eedba1;
    text-align: center;
    height: 1.5rem;
    color: #333;
    padding:  .5rem 0 .5rem 0;
  }

  .header-title {
    text-decoration: none;
  }

  button {
    padding: .15rem .7rem;
    border: none;
    border-radius: 1rem;
    margin: 0 0 0 0;
    background-color: white;
    color: black;
  }


@media (max-width: 1100px) {
  main {
    width: 98%;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input[type=text] {
    margin: 0 .5rem 0 .5rem;
  }


}



</style>