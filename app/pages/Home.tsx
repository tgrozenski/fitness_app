import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Pressable, Image } from 'react-native';
import Dialog from "react-native-dialog";
import Toast from 'react-native-toast-message';
import parentData from "../components/parentData" 
import { router } from "expo-router";
import * as validate from '../modules/validatorModule';
import * as notification from'../modules/Notification Manager'
import daysArray from '../daysArray';


const DATA: parentData[] = daysArray;

// daysArray.forEach(
// function(item) {
//   DATA.push(item);
// });

const validator: validate.App.validator = new validate.App.validator();
const notificationManager: notification.NotificationManager.Notifs = new notification.NotificationManager.Notifs;
notificationManager.registerForPushNotificationsAsync();
type parentProps= {
  item: parentData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: parentProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);
var counter = 0;

const HomePage = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [del_Dialog, setdel_Dialog] = useState(false);
  const [text, setText] = useState('');

 useEffect( () => {
        console.log('Selected id is currently  ' + selectedId );
      }, [selectedId]);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const show_delDialog = () => {
    setdel_Dialog(true);
  }

  const hide_delDialog = () => {
    setdel_Dialog(false);
  }

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    })
  }

  const change_editmode = () => {
    if(editmode) {
      setEditmode(false);
      showToast('Done Editing');
    }

    else {
      setEditmode(true);
      showToast('Click the pencil when done editing');
    }
    }
    
  const itemTouchevent = (id: string, title: string) => {

    setSelectedId(id)
    
    if (editmode) {
      show_delDialog();
    } 
    else {
      //route to exercise list, pass id along!  
      globalThis.lastParent = title;
      globalThis.lastParentId = id;
      router.push({pathname: "pages/exerciseList"}) 
    }
  }


  
  const handleSubmit = () => {
    setVisible(false);
    const newItem: parentData = {
      id: '' + counter, 
      title: text,
    };
    counter++
    DATA.push(newItem);
    console.log(DATA);
  }

  function handleDelete() {

    const index = DATA.findIndex((item) => item.id === selectedId);
    if (index !== -1) {
      DATA.splice(index, 1);
      setdel_Dialog(false);
      return true; 
    } 
  }
  
  const renderItem = ({item}: {item: parentData}) => {
    const backgroundColor = item.id === selectedId ? '#3D5168' : 'grey'  ;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      
      <Item
        item={item}
        onPress={() => 
          itemTouchevent(item.id, item.title)
                  }
        backgroundColor={backgroundColor}
        textColor={color}
      />
      
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
      <Pressable onPress={change_editmode}>
      <Image style={styles.image} 
      source={require('./imgAssets/editAsset.png')}>
      </Image>
      </Pressable>      

      <Pressable onPress={showDialog}>
      <Image style={styles.image} 
      source={require('./imgAssets/plus_Icon.png')}>
      </Image>
      </Pressable>
      
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        initialNumToRender={7}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <View style={styles.container}>

      {/* dialog for creating day */}
      <Dialog.Container visible={visible}>
        <Dialog.Title>Create A new Day</Dialog.Title>
        <Dialog.Input 
        placeholder="Enter the name of your day!"
        onChangeText={text => setText(validator.validateString(text))}>
        </Dialog.Input>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Submit" onPress={handleSubmit} />
        </Dialog.Container>

        {/* dialog for deleting */}
      <Dialog.Container visible={del_Dialog}>
        <Dialog.Title>Are you sure you want to delete?</Dialog.Title>
        <Dialog.Button label="Cancel" onPress={hide_delDialog} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
    <Toast>

    </Toast>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'beige',
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  buttons: {
    padding: 20,
    justifyContent: "space-around",
    flexDirection: 'row',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:20,
  },
  title: {
    fontSize: 32,
  },
}); 

export default HomePage