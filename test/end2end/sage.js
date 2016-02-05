describe('Sage', function() {
  var userString = 'testuser' + Math.floor(Math.random()*100000000);
  var randTask = Math.floor(Math.random()*100000000);
  it('should test in a test environment', function() {
    expect(process.env.NODE_ENV).toEqual('test');
  });

  describe('auth', function() {
    
    it('loads', function() {
      browser.get('http://localhost:3000/#/signin');
      expect(element(by.css('.subheader')).getText()).toEqual('Sign In');
    });

    it('signs up', function() {
      browser.get('http://localhost:3000/#/signup');
      expect(element(by.css('.subheader')).getText()).toEqual('Sign Up');
      element(by.model('user.teamname')).sendKeys('testteam');
      element(by.model('user.username')).sendKeys(userString);
      element(by.model('user.password')).sendKeys('testpass');
      element(by.id('signInBtn')).click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/tasks');
    });

    it('signs out', function() {
      element(by.css('.logoutbtn')).click();
      expect(element(by.css('.subheader')).getText()).toEqual('Sign In');
    });

    it('does not sign in with invalid credentials', function() {
      browser.get('http://localhost:3000/#/signin');
      element(by.model('user.teamname')).sendKeys('testteam');
      element(by.model('user.username')).sendKeys(userString);
      element(by.model('user.password')).sendKeys('testpass2');
      element(by.id('signInBtn')).click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/signin');
    });

    it('signs in', function() {
      browser.get('http://localhost:3000/#/signin');
      element(by.model('user.teamname')).sendKeys('testteam');
      element(by.model('user.username')).sendKeys(userString);
      element(by.model('user.password')).sendKeys('testpass');
      element(by.id('signInBtn')).click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/tasks');
    });

  });
  // describe('tasks', function() {
  //   it('has an add form', function() {
  //     element(by.id('addTask')).click();
  //     expect(element(by.id('addTaskButton')).isPresent()).toEqual(true);
  //   });
  // });
});
