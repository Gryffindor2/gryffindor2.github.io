function showMessageBox(title, msg) {
    var w = new Window("messageBox", true);
    w.title = title;
    var msgTextBlock = new TextBlock(msg, "text-" + "messagebox");
    msgTextBlock.margin = ["5px", "5px", "5px", "5px"];
    w.getMainWindow().appendComponent(msgTextBlock);
    var okButton = new Button("确认", "okButton-" + "messagebox");
    okButton.setSize("70px", "30px");
    okButton.onClick = () => {
        w.hide();
    };
    okButton.style.float = "right";
    okButton.margin = ["5px", "5px", "5px", "5px"];
    w.getMainWindow().appendComponent(okButton);
    w.setPos("50px", "50px");
    w.setSize("300px", "");
}
function info(info) {
    showMessageBox("消息框", info == null ? "info" : info);
}
