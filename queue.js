class Queue {
    
    //elements = [];
    constructor() 
    {
        this.elements = [];
    }

    enqueue( x )
    {
        this.elements.push( x );
    }

    dequeue()
    {
        this.elements.shift();
    }

    isEmpty()
    {
        if( this.elements.length === 0 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    peek()
    {
        if ( this.elements.length != 0 )
        {
            return this.elements[0];
        }
        else
        {
            return "The queue is empty";
            // could return undefined?
        }
    }

    length()
    {
        return this.elements.length;
    }

    clear()
    {
        this.elements = [];
    }
}

module.exports = Queue;