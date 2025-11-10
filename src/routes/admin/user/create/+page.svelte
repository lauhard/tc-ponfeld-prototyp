<script lang="ts">
    import { enhance } from '$app/forms';
</script>
<h1>Create User</h1>


<form method="POST" action="?/createUser" use:enhance>
    <fieldset>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

    </fieldset>
    <button type="submit">Create User</button>
</form>

<style lang="ts">
    
</style>