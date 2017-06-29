# ng-super-tipster
Angular Directive for Tooltips that are good for desktop use but also very mobile friendly.

### Setup
Inject into your app.

angular.module('myApp', ['tipster']);

### Markup
<super-tipster>
  <button tipster-triger>Your Button</button>
  <div class="super-tipster">
    <div class="tipster-content">
      Your Content Here!
    </div>
  </div>
</super-tipster>
