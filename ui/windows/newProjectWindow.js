function showNewProjectWindow(){
    let newProjectWindow = new Window('newProjectWindow', true);
    newProjectWindow.setSize('700px','500px');
    newProjectWindow.setPos('200px', '100px');
    newProjectWindow.title = '新建工程';
	var mainStackpanel = new StackPanel('mainStackpanel')
	mainStackpanel.setSize('100%','100%');
	mainStackpanel.direction = 'horizontal';
	newProjectWindow.getMainWindow().appendComponent(mainStackpanel);
	var cardContainer = new CardView('cardContainer', function(str, card){
		var panel = new StackPanel(str[0]);
		panel.direction = 'vertical';
        panel.style.alignItems = 'center';
		var im = new ImageFluent('Image-'+str[0]);
		im.source = './assets/icon/project.png';
        im.setSize('80px', '80px');
		var hintTextBlock = new TextBlock(str[1], 'text-'+str[0]);
		panel.appendComponent(im,hintTextBlock);
		return panel;
	});
	cardContainer.style.flex = '1';
    cardContainer.margin = ['5px','5px','5px','5px']
	cardContainer.add(['sdfsdff','A4']);
	cardContainer.add(['sdfasfdsag','A3']);
    cardContainer.add(['sdf','A5'])
    cardContainer.add(['sdf','B4'])
    cardContainer.add(['sdf','B5'])
    cardContainer.add(['sdf','B3'])
	var compContainer = new StackPanel('compContainer');
	compContainer.setSize('200px','');
    compContainer.margin = ['0px', '5px', '5px', '5px'];

	var prefebNameContainer = new StackPanel('prefebNameContainer');
    prefebNameContainer.direction = 'horizontal';
    var combox = new ComboBox('cbbx');
    combox.placeHolder='选择预设';
    combox.setSize('120px','30px')
    combox.addItem('A4');
    combox.addItem('A5');
    combox.addItem('A3');
    prefebNameContainer.appendComponent(combox);
    prefebNameContainer.margin = ['5px','5px','5px','0px'];

    var widthContainer = new StackPanel('widthContainer');
    widthContainer.direction = 'horizontal';
    var widthHintTextBlock = new TextBlock('width:','widthHintTextBlock');
    widthHintTextBlock.setSize('60px','30px');
    var widthTextBox = new TextBox('widthTextBox');
    widthTextBox.setSize('80px','30px');
    widthTextBox.placeHolder = 'px';
    widthContainer.appendComponent(widthHintTextBlock, widthTextBox);
    widthContainer.margin = ['5px','5px','5px','0px'];

    var heightContainer = new StackPanel('heightHintTextBlock');
    heightContainer.direction = 'horizontal';
    var heightHintTextBlock = new TextBlock('height:','heightHintTextBlock');
    heightHintTextBlock.setSize('60px','30px');
    var heightTextBox = new TextBox('heightTextBox');
    heightTextBox.setSize('80px','30px');
    heightTextBox.placeHolder = 'px';
    heightContainer.appendComponent(heightHintTextBlock, heightTextBox);
    heightContainer.margin = ['5px','5px','5px','0px'];

    var dpiContainer = new StackPanel('dpiContainer');
    dpiContainer.direction = 'horizontal';
    var dpiHintTextBlock = new TextBlock('dpi:','dpiHintTextBlock');
    dpiHintTextBlock.setSize('60px','30px');
    var dpiTextBox = new TextBox('dpiTextBox');
    dpiTextBox.setSize('80px','30px');
    dpiContainer.appendComponent(dpiHintTextBlock, dpiTextBox);
    dpiContainer.margin = ['5px','5px','5px','0px'];

    var whrateKeepingContainer = new StackPanel('whrateKeepingContainer');
    whrateKeepingContainer.direction = 'horizontal';
    var whrateKeepingCheckBox = new CheckBox('whrateKeepingCheckBox');
    var whrateKeepingHintTextBlock = new TextBlock('保持宽纵比','whrateKeepingHintTextBlock');
    whrateKeepingHintTextBlock.setSize('','30px');
    whrateKeepingHintTextBlock.setTextVerticallyCenterAligned();
    whrateKeepingHintTextBlock.margin = ['5px', '', '', ''];
    whrateKeepingContainer.appendComponent(whrateKeepingCheckBox, whrateKeepingHintTextBlock);
    whrateKeepingContainer.style.alignItems = 'center';
    whrateKeepingContainer.margin = ['5px','5px','5px','0px'];

    var verticalBlank = new PlaceHolder('verticalBlank');  

    var buttonContainer = new StackPanel('buttonContainer');
    buttonContainer.direction = 'horizontal';
    var horizontalBlank = new PlaceHolder('horizontalBlank');
    var cancelButton = new Button('取消', 'cancelButton');
    cancelButton.margin = ['5px','5px','5px','0px'];
    cancelButton.setSize('70px','35px');
    var okButton = new Button('确认', 'okButton');
    okButton.setSize('70px','35px');
    okButton.margin = ['5px','5px','5px','0px'];
    buttonContainer.appendComponent(horizontalBlank,okButton,cancelButton);

    compContainer.appendComponent(prefebNameContainer,widthContainer,heightContainer,dpiContainer);
    compContainer.appendComponent(whrateKeepingContainer,verticalBlank,buttonContainer);

	mainStackpanel.appendComponent(cardContainer,compContainer);
}