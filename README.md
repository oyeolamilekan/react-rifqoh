this is the frontend if shopstack.co

the apps are split into different folders

1. accounts: the folder contains all of the authentication functionalities.

2. analytics: contains the chart components that is used to messure the interaction between all the stores.

3. comments: contains all the components related to lesson component it is used to track comments made by user, for instance an object can have multiple comments under it.

4. commerce: this is the meat of the program, this component contains 7 different components.
    i. The AddProduct component is used to a create a product obj, and recieves a json response of the product        created, and appends the product cProducts component
    
    ii. The cProduct component is used to list the products created by the user, it has 3 different actions which     are delete, edit, and analytics
        i. delete action: the delete action, deletes the product and removes the product from cProduct component
    
    iii. 