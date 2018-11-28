window.onload = ()=>
{
    window.clientState = new ClientState(
    {
        canvas: document.getElementById('canvas'),
        io,
    });
};