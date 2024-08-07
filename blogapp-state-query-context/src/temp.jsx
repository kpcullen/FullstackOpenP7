{
  !user && (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  )
}
{
  user && (
    <Route
      path="/"
      element={
        <Blogs
          user={user}
          blogs={blogs}
          loading={blogsIsPending}
          handleLogout={handleLogout}
        />
      }
    />
  )
}
