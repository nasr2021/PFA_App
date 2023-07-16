import React, { useState , useEffect} from "react";
import {Button,Stack,VStack,FormControl,FormLabel,Input,Textarea,Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalFooter, ModalCloseButton,Select,} from "@chakra-ui/react";
import { db,storageRef,storage,auth ,fieldValue} from "../../../firebase/firebase-config";
import FiliereForm from "./fiterForm";
import { useNavigate } from "react-router-dom";
const ButtonWidget = ({ label, type,courseId,formationId,packId,bourseId ,stageId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [clickCount, setClickCount] = useState(0);
  const [coursIdToDelete, setCoursIdToDelete] = useState("");
  const [currentCourse, setCurrentCourse] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilters, setSelectedFilters] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedEtudiant, setSelectedEtudiant] = useState('');
  const [selectedEtudiantId, setSelectedEtudiantId] = useState('');
 

  useEffect(() => {
    if (bourseId) {
      // Récupérer les anciennes données du document bourseId
      db.collection('bourse')
        .doc(bourseId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const bourseData = doc.data();
            setFormData({
              nomBourse: bourseData.nomBourse || '',
              description: bourseData.description || '',
              date: bourseData.date || '',
              prix: bourseData.prix || '',
              state: bourseData.state || '',
            });
          } else {
            console.log('Le document bourse n\'existe pas');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données du document bourse:', error);
        });
    }else  if (stageId) {
      // Récupérer les anciennes données du document bourseId
      db.collection('stage')
        .doc(stageId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const stageData = doc.data();
            setFormData({
              environement: stageData.environement || '',
              description: stageData.description || '',
              date: stageData.date || '',
              responsable: stageData.responsable || '',
              profile: stageData.profile || '',
              stageName: stageData.stageName || '',
              mail: stageData.mail || '',
            });
          } else {
            console.log('Le document stageId n\'existe pas');
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données du document stageId:', error);
        });
    }
  }, [bourseId,stageId]);
  const navigate = useNavigate();
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setSelectedTitle(e.target.options[e.target.selectedIndex].text);
  };
  const handleFiltersChange = (e) => {
    setSelectedFilters(e.target.value);
    setSelectedEtudiant(e.target.options[e.target.selectedIndex].text);
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedUid = selectedOption.getAttribute("data-uid");
    setSelectedEtudiantId(selectedUid);
  };
  
  // Load timetable titles from the database
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const querySnapshot = await db.collection("timetable").get();
        const titlesData = querySnapshot.docs.map((doc) => doc.data().title);
        setTitles(titlesData);
      } catch (error) {
        console.error("Error fetching timetable titles:", error);
      }
    };
    const fetchEtudiant = async () => {
      try {
        const querySnapshot = await db.collection("user").get();
        const etudiantData = querySnapshot.docs.map((doc) => {
          return {
            cin: doc.data().cin,
            uid: doc.id,
          };
        });
        setEtudiant(etudiantData);
      } catch (error) {
        console.error("Error fetching cin:", error);
      }
    };
    fetchEtudiant();
    fetchTitles();
  }, []);
  const [titles, setTitles] = useState([]);
  const [etudiant, setEtudiant] = useState([]);
  const handleOpenModal = (id) => {
    setIsOpen(true);
    setCoursIdToDelete(id);
    setCurrentCourse(id);
  };
  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;
    if (files.length > 0) {
      const filePromises = Array.from(files).map((file) => {
        const fileRef = storageRef.child(file.name);
        return fileRef.put(file);
      });
  
      Promise.all(filePromises)
        .then((snapshots) => {
          const urlPromises = snapshots.map((snapshot) =>
            snapshot.ref.getDownloadURL()
          );
  
          Promise.all(urlPromises).then((urls) => {
            setFormData((prevData) => ({
              ...prevData,
              [fieldName]: urls,
              pdfURL: fieldName === "pdf" ? urls : prevData.pdfURL,
              videoURL: fieldName === "video" ? urls : prevData.videoURL,
              fileURL: fieldName === "avatar" ? urls : prevData.fileURL,
            }));
          });
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    }
  };
  
  
  const handleCloseModal = () => {
    setIsOpen(false);
    setFormData({});
    //setCoursId("");
  };

  const handleFilesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileRef = storageRef.child(file.name);
  
      // Enregistrer le fichier dans Firebase Storage
      fileRef.put(file)
        .then((snapshot) => {
          // Obtenir l'URL de téléchargement du fichier
          snapshot.ref.getDownloadURL()
            .then((url) => {
              setFormData((prevData) => ({
                ...prevData,
                fileURL: url,
                imageURL: url,
              }));
            })
            .catch((error) => {
              console.error("Erreur lors de l'obtention de l'URL de téléchargement du fichier :", error);
            });
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement du fichier dans Firebase Storage :", error);
        });
    }
  };
  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };
  const handleSubmit = (e ) => {
    e.preventDefault();
    const prix = Number(formData.prix);
    const prixpt = Number(formData.prixpt);
    const tarife = Number(formData.tarife);
    const point= Number(formData.point);
    // Enregistrement des données dans la collection appropriée en fonction du type de modal
    if (type === 'modal1') {
      const { image, links, video, pdf, ...restData } = formData;
    
      // Convert the links field to an array if it has a value
      const linksArray = links && links.trim() !== '' ? links.split(',').map((value) => value.trim()) : [];
    
      // Convert the video field to an array if it has a value
      const videosArray = Array.isArray(video) ? video : video && video.trim() !== '' ? [video.trim()] : [];
    
      // Convert the pdf field to an array if it has a value
      const pdfsArray = Array.isArray(pdf) ? pdf : pdf && pdf.trim() !== '' ? [pdf.trim()] : [];
    
      const dataWithFileURL = {
        ...restData,
        links: linksArray,
        image: image || '', // Set a default value for the image field if it is undefined
        video: videosArray,
        pdf: pdfsArray,
        fileURL: formData.fileURL || '', // Set a default value for the fileURL field if it is undefined
        pdfURL: formData.pdfURL || '',
        tarife: tarife,
      };
    
      db.collection('cours')
        .add(dataWithFileURL)
        .then((docRef) => {
          // Récupérer l'ID du document créé
          const courseId = docRef.id;
    
          // Ajouter l'ID du cours aux données enregistrées
          const updatedData = { ...dataWithFileURL, coursId: courseId };
    
          // Remove the videoURL field if it is undefined
          if (!updatedData.videoURL) {
            delete updatedData.videoURL;
          }
    
          // Mettre à jour le document avec l'ID du cours
          db.collection('cours')
            .doc(docRef.id)
            .update(updatedData)
            .then(() => {
              // Ajouter une notification dans la collection "notifications"
              const notificationData = {
                text: 'Il y a un nouveau cours qui est fait',
                courseName: restData.titre ||'',
                read:false,
              };
    
              db.collection('notifications')
                .add(notificationData)
                .then(() => {
                  console.log('Notification ajoutée avec succès');
                })
                .catch((error) => {
                  console.error('Erreur lors de l\'ajout de la notification:', error);
                });
            })
            .catch((error) => {
              console.error('Erreur lors de la mise à jour du document:', error);
            });
        })
        .catch((error) => {
          console.error('Erreur lors de l\'enregistrement des données:', error);
        });
    }
    
     else if (type === "modal2") {
      const { avatar, links, video, pdf, ...restData } = formData;
    
      // Convert the links field to an array if it has a value
      const linksArray = links && links.trim() !== "" ? links.split(",").map((value) => value.trim()) : [];
    
      // Convert the video field to an array if it has a value
      const videosArray = Array.isArray(video) ? video : (video && video.trim() !== "" ? [video.trim()] : []);
    
      // Convert the pdf field to an array if it has a value
      const pdfsArray = Array.isArray(pdf) ? pdf : pdf && pdf.trim() !== '' ? [pdf.trim()] : [];
    
      const dataWithFileURL = {
        ...restData,
        links: linksArray,
        avatar: formData.fileURL || "", // Set a default value for the avatar field if it is undefined
        video: videosArray,
        pdf: pdfsArray,
        pdfURL: formData.pdfURL || "", // Set a default value for the pdfURL field if it is undefined
      prix: prix,
      prixpt:prixpt,
      
      };
    
      db.collection("formation")
        .add(dataWithFileURL)
        .then((docRef) => {
          // Récupérer l'ID du document créé
          const formationId = docRef.id;
    
          // Ajouter l'ID de la formation aux données enregistrées
          const updatedData = { ...dataWithFileURL, formationId: formationId };
    
          // Mettre à jour le document avec l'ID de la formation
          db.collection("formation")
            .doc(docRef.id)
            .update(updatedData)   .then(() => {
              // Ajouter une notification dans la collection "notifications"
            
              const notificationData = {
                text: 'Il y a un nouveau formation qui est fait',
                courseName: restData.title,
                read: false,
              };
    
              db.collection('notifications')
                .add(notificationData)
                .then(() => {
                  console.log('Notification ajoutée avec succès');
                })
                .catch((error) => {
                  console.error('Erreur lors de l\'ajout de la notification:', error);
                });
            })
            .catch((error) => {
              console.error('Erreur lors de la mise à jour du document:', error);
            });
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement des données :", error);
        });
    }
     else if (type === "modal3") {
      const dataWithFileURL = { ...formData };
      db.collection("stage").add(dataWithFileURL) .then((docRef) => {
        // Récupérer l'ID du document créé
        const stageId = docRef.id;
  
        // Ajouter l'ID de la formation aux données enregistrées
        const updatedData = { ...dataWithFileURL, stageId: stageId };
  
        // Mettre à jour le document avec l'ID de le stage
        db.collection("stage")
          .doc(docRef.id)
          .update(updatedData)   .then(() => {
            // Ajouter une notification dans la collection "notifications"
            const notificationData = {
              text: 'Il y a un nouveau stage qui est fait',
              courseName: formData.stageName,
              read:false,
            };
  
            db.collection('notifications')
              .add(notificationData)
              .then(() => {
                console.log('Notification ajoutée avec succès');
              })
              .catch((error) => {
                console.error('Erreur lors de l\'ajout de la notification:', error);
              });
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour du document:', error);
          });
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement des données :", error);
      });
    } else 
    if (type === 'modal4') {
      if (!formData.fileURL) {
        console.error("L'URL du fichier est manquante");
        return;
      }
  
      const dataWithFileURL = { ...formData, image: formData.fileURL };
  
      db.collection('bourse')
        .add(dataWithFileURL)
        .then((docRef) => {
          // Récupérer l'ID du document créé
          const bourseId = docRef.id;
  
          // Ajouter l'ID de la formation aux données enregistrées
          const updatedData = { ...dataWithFileURL, bourseId: bourseId };
  
          // Mettre à jour le document avec l'ID de la bourse
          db.collection('bourse')
            .doc(docRef.id)
            .update(updatedData)
            .then(() => {
              // Ajouter une notification dans la collection "notifications"
              const notificationData = {
                text: 'Il y a un nouveau bourse qui est fait',
                courseName: formData.nomBourse,
                read: false,
              };
  
              db.collection('notifications')
                .add(notificationData)
                .then(() => {
                  console.log('Notification ajoutée avec succès');
                })
                .catch((error) => {
                  console.error("Erreur lors de l'ajout de la notification:", error);
                });
            })
            .catch((error) => {
              console.error('Erreur lors de la mise à jour du document:', error);
            });
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement des données :", error);
        });
    }
    else if (type === "modal5") {
      let pdfValue = '';
      if (formData.fileURL) {
        pdfValue = formData.fileURL;
      }
      
      const dataWithFileURL = {
        ...formData,
        pdf: pdfValue,
      };
      if (formData.type === "examen") {
        db.collection("examen").add(dataWithFileURL)
        .then((docRef) => {
          // Récupérer l'ID du document créé
          const examenId = docRef.id;
    
          // Ajouter l'ID de l'examen  aux données enregistrées
          const updatedData = { ...dataWithFileURL, examenId: examenId };
    
          // Mettre à jour le document avec l'ID de la formation
          db.collection("examen")
            .doc(docRef.id)
            .update(updatedData)   .then(() => {
              // Ajouter une notification dans la collection "notifications"
              const notificationData = {
                text: 'Il y a un nouveau examen qui est fait',
                courseName: formData.examenname,
                read:false,
              };
    
              db.collection('notifications')
                .add(notificationData)
                .then(() => {
                  console.log('Notification ajoutée avec succès');
                })
                .catch((error) => {
                  console.error('Erreur lors de l\'ajout de la notification:', error);
                });
            })
            .catch((error) => {
              console.error('Erreur lors de la mise à jour du document:', error);
            });
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement des données :", error);
        });
      } else {
        db.collection("archive").add(dataWithFileURL)
        .then((docRef) => {
          // Récupérer l'ID du document créé
          const archiveId = docRef.id;
    
          // Ajouter l'ID de la formation aux données enregistrées
          const updatedData = { ...dataWithFileURL, archiveId: archiveId };
    
          // Mettre à jour le document avec l'ID de l'archive
          db.collection("archive")
            .doc(docRef.id)
            .update(updatedData)   .then(() => {
              // Ajouter une notification dans la collection "notifications"
              const notificationData = {
                text: 'Il y a un nouveau archive qui est fait',
               
              };
    
              db.collection('notifications')
                .add(notificationData)
                .then(() => {
                  console.log('Notification ajoutée avec succès');
                })
                .catch((error) => {
                  console.error('Erreur lors de l\'ajout de la notification:', error);
                });
            })
            .catch((error) => {
              console.error('Erreur lors de la mise à jour du document:', error);
            });
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement des données :", error);
        });}
    }
    else if (type === "modal15") {
      const dataWithFileURL = { ...formData, userId: selectedEtudiantId };
    
      db.collection("note")
        .add(dataWithFileURL)
        .then(() => {
          console.log("Données ajoutées à la collection note avec succès");
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout des données à la collection examen:", error);
        });
    }
    else if (type === "modal6") {
      console.log("formation ID:", formationId);
      const userId = auth.currentUser.uid;
      console.log("User ID:", userId);
    
      if (formData.type === "Point") {
        // Récupérer la valeur de coursnbr de l'utilisateur
        db.collection("user")
          .doc(userId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              const point = Number(userData.point); // Parse the "point" value as a number
              console.log("Valeur de point:", point);
    
              // Récupérer la valeur de prixpt de la formation
              db.collection("formation")
                .doc(formationId)
                .get()
                .then((doc) => {
                  if (doc.exists) {
                    const formationData = doc.data();
                    const prixpt = Number(formationData.prixpt); // Parse the "prixpt" value as a number
                    console.log("Valeur de prixpt:", prixpt);
    
                    // Effectuer l'opération de soustraction
                    const newpoint = point - prixpt;
                    console.log("Nouvelle valeur de point:", newpoint);
    
                    if (newpoint < 0) {
                      alert("Le nombre de point cours disponible est insuffisant.");
                      db.collection("user")
                        .doc(userId)
                        .update({ point: point })
                        .then(() => {
                          console.log("Valeur de point mise à jour avec succès");
    
                          // Effectuer d'autres opérations après la mise à jour
                          // ...
                        })
                        .catch((error) => {
                          console.error("Erreur lors de la mise à jour de la valeur de point :", error);
                        });
                    } else {
                      // Mettre à jour la valeur de coursnbr de l'utilisateur
                      db.collection("user")
                        .doc(userId)
                        .update({ point: newpoint, formationIds: fieldValue.arrayUnion(formationId) })
                        .then(() => {
                          console.log("Valeur de coursnbr mise à jour avec succès");
                          navigate(`/Simple?id=${formationId}`);
                          // Effectuer d'autres opérations après la mise à jour
                          // ...
                        })
                        .catch((error) => {
                          console.error("Erreur lors de la mise à jour de la valeur de coursnbr :", error);
                        });
                    }
                  } else {
                    console.log("La formation n'existe pas");
                  }
                })
                .catch((error) => {
                  console.error("Erreur lors de la récupération de la valeur de prixpt :", error);
                });
            } else {
              console.log("L'utilisateur n'existe pas");
            }
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération de la valeur de coursnbr :", error);
          });
      } else if (formData.type === "Carte") {
        // Récupérer la valeur de nbrPt de l'utilisateur
        db.collection("user")
          .doc(userId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              const nbrPt = Number(userData.nbrPt); // Parse the "nbrPt" value as a number
              console.log("Valeur de nbrPt:", nbrPt);
    
              // Récupérer la valeur de prix de la formation
              db.collection("formation")
                .doc(formationId)
                .get()
                .then((doc) => {
                  if (doc.exists) {
                    const formationData = doc.data();
                    const prix = Number(formationData.prix); // Parse the "prix" value as a number
                    console.log("Valeur de prix:", prix);
    
                    // Effectuer l'opération d'addition
                    const newNbrPt = nbrPt + prix;
                    console.log("Nouvelle valeur de nbrPt:", newNbrPt);
    
                    // Mettre à jour la valeur de nbrPt de l'utilisateur
                    db.collection("user")
                      .doc(userId)
                      .update({ nbrPt: newNbrPt, formationIds: fieldValue.arrayUnion(formationId) })
                      .then(() => {
                        console.log("Valeur de nbrPt mise à jour avec succès");
                        navigate(`/Simple?id=${formationId}`);
                        // Effectuer d'autres opérations après la mise à jour
                        // ...
                      })
                      .catch((error) => {
                        console.error("Erreur lors de la mise à jour de la valeur de nbrPt :", error);
                      });
                  } else {
                    console.log("La formation n'existe pas");
                  }
                })
                .catch((error) => {
                  console.error("Erreur lors de la récupération de la valeur de prix :", error);
                });
            } else {
              console.log("L'utilisateur n'existe pas");
            }
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération de la valeur de nbrPt :", error);
          });
      } else if (formData.type === "gratuit") {
        db.collection("formation")
          .doc(formationId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const formationData = doc.data();
              const type = formationData.type;
              console.log("Valeur de type:", type);
    
              if (type === "gratuit") {
                db.collection("user")
                  .doc(userId)
                  .update({ formationIds: fieldValue.arrayUnion(formationId) })
                  .then(() => {
                    console.log("ID de formation enregistré avec succès dans la liste des formations de l'utilisateur");
                    navigate(`/Simple?id=${formationId}`);
                  })
                  .catch((error) => {
                    console.error("Erreur lors de l'enregistrement de l'ID de formation dans la liste des formations de l'utilisateur :", error);
                  });
              } else {
                alert("Cette formation n'est pas gratuite.");
              }  } }); }
    }
    else if (type === "modal7") {
    console.log("Cours ID:", courseId);
    const { image, links, video, pdf, ...restData } = formData;
      // Convert the links field to an array if it has a value
      const linksArray = links && links.trim() !== '' ? links.split(',').map((value) => value.trim()) : [];
    
      // Convert the video field to an array if it has a value
      const videosArray = Array.isArray(video) ? video : video && video.trim() !== '' ? [video.trim()] : [];
    
      // Convert the pdf field to an array if it has a value
  const pdfsArray = Array.isArray(pdf) ? pdf : pdf && pdf.trim() !== '' ? [pdf.trim()] : [];

    const dataWithFileURL = {
      ...restData,
      links: linksArray,
      image: image || '', // Set a default value for the image field if it is undefined
      video: videosArray,
     // pdf: pdfsArray,
      fileURL: formData.fileURL || '', // Set a default value for the fileURL field if it is undefined
     // pdfURL: formData.pdfURL || '',
      tarife: tarife,
    };
      // Update the pdf field with the values from pdfsArray
  if (pdfsArray.length > 0) {
    dataWithFileURL.pdf = fieldValue.arrayUnion(...pdfsArray);
  }

    db.collection("cours")
      .doc(courseId)
      .update(dataWithFileURL)
      .then(() => {
        console.log("Le cours a été mis à jour avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du cours :", error);
      });
  } else if (type === "modal9") {
    const dataWithFileURL = { ...formData, imageURL: formData.fileURL };
  
    // Modify timetable collection by title
    db.collection("timetable")
      .where("title", "==", selectedFilter)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("timetable")
            .doc(doc.id)
            .update(dataWithFileURL)
            .then(() => {
              console.log("La timetable a été mise à jour avec succès");
            })
            .catch((error) => {
              console.error("Erreur lors de la mise à jour de la timetable :", error);
            });
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche de la timetable :", error);
      });
  }else if (type === 'modal16'&&packId) {
    console.log('packId', packId);
    const user = auth.currentUser;
    const userId = user.uid;
  console.log("userId",userId);
    // Retrieve the pack document
    db.collection('pack')
      .doc(packId)
      .get()
      .then((packDoc) => {
        if (packDoc.exists) {
          const packData = packDoc.data();
          const nbrCommpte = packData.nbrCommpte || 0; // Get the nbrCommpte value from the pack document
          const nbrCours = packData.nbrCours || 0; // Get the nbrCours value from the pack document
  const nbrFormation=packData.nbrFormation|| 0;
          // Increment the pt value of the user document by nbrCommpte
          db.collection('user')
            .doc(userId)
            .update({
              pack: fieldValue.increment(nbrCommpte),
            })
            .then(() => {
              console.log('pt value incremented by nbrCommpte');
            })
            .catch((error) => {
              console.error('Error updating pt value:', error);
            });
    // Increment the pt value of the user document by nbrCommpte
    db.collection('user')
    .doc(userId)
    .update({
      nbrFormation: fieldValue.increment(nbrFormation),
    })
    .then(() => {
      console.log('pt value incremented by nbrFormation');
    })
    .catch((error) => {
      console.error('Error updating pt value:', error);
    });
          // Increment the coursnbr value of the user document by nbrCours
          db.collection('user')
            .doc(userId)
            .update({
              coursnbr: fieldValue.increment(nbrCours),
            })
            .then(() => {
              console.log('coursnbr value incremented by nbrCours');
            })
            .catch((error) => {
              console.error('Error updating coursnbr value:', error);
            });
        } else {
          console.log('Pack document does not exist');
        }
      })
      .catch((error) => {
        console.error('Error fetching pack document:', error);
      });
  }
   else if (type === "modal10") {
    const dataWithFileURL = { ...formData };
    db.collection("pack").add(dataWithFileURL) .then((docRef) => {
      // Récupérer l'ID du document créé
      const packId = docRef.id;

      // Ajouter l'ID de la formation aux données enregistrées
      const updatedData = { ...dataWithFileURL, packId: packId };

      // Mettre à jour le document avec l'ID de la bourse
      db.collection("pack")
        .doc(docRef.id)
        .update(updatedData)   .then(() => {
          // Ajouter une notification dans la collection "notifications"
          const notificationData = {
            text: 'Il y a un nouveau bourse qui est fait',
            courseName: formData.title,
          };

          db.collection('notifications')
            .add(notificationData)
            .then(() => {
              console.log('Notification ajoutée avec succès');
            })
            .catch((error) => {
              console.error('Erreur lors de l\'ajout de la notification:', error);
            });
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du document:', error);
        });
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement des données :", error);
    });
    } 
    else if (type === "modal8") {
      console.log("Cours ID:", courseId);
      db.collection("cours")
      .doc(courseId)
      .delete()
      .then(() => {
        console.log("Le cours a été supprimé avec succès");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du cours :", error);
      });
  
  }else if (type === "modal13") {
    console.log("Cours ID:", formationId);
    db.collection("formation")
    .doc(formationId)
    .delete()
    .then(() => {
      console.log("Le formationId a été supprimé avec succès");
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de formationId :", error);
    });

} else if (type === "modal17") {
  console.log("bourse ID:", bourseId);
  db.collection('bourse')
  .doc(bourseId)
  .update(formData)
  .then(() => {
    console.log('Le document bourse a été mis à jour avec succès');
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du document bourse :", error);
  });

}
else   if (type === 'modal18') {
  console.log('bourse ID:', bourseId);

  // Supprimer le document de la collection "bourse" avec l'ID correspondant
  db.collection('bourse')
    .doc(bourseId)
    .delete()
    .then(() => {
      console.log('Le bourseId a été supprimé avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de bourseId:', error);
    });
}
else if (type === "modal20") {
  console.log("stageId ID:", stageId);
  db.collection('stage')
  .doc(stageId)
  .update(formData)
  .then(() => {
    console.log('Le document stageId a été mis à jour avec succès');
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du document stageId :", error);
  });

}
else   if (type === 'modal21') {
  console.log('stage ID:', stageId);

  // Supprimer le document de la collection "bourse" avec l'ID correspondant
  db.collection('stage')
    .doc(stageId)
    .delete()
    .then(() => {
      console.log('Le stageId a été supprimé avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de stageId:', error);
    });
}
else if (type === "modal14") {
  console.log("Cours ID:", formationId);
  const { image, links, video, pdf, ...restData } = formData;
  // Convert the links field to an array if it has a value
  const linksArray = links && links.trim() !== '' ? links.split(',').map((value) => value.trim()) : [];

  // Convert the video field to an array if it has a value
  const videosArray = Array.isArray(video) ? video : video && video.trim() !== '' ? [video.trim()] : [];

  // Convert the pdf field to an array if it has a value
const pdfsArray = Array.isArray(pdf) ? pdf : pdf && pdf.trim() !== '' ? [pdf.trim()] : [];

 
const dataWithFileURL = {
  ...restData,
  links: linksArray,
  image: image || '', // Set a default value for the image field if it is undefined
  video: videosArray,
 // pdf: pdfsArray,
  fileURL: formData.fileURL || '', // Set a default value for the fileURL field if it is undefined
 // pdfURL: formData.pdfURL || '',
  tarife: tarife,
};
 // Update the pdf field with the values from pdfsArray
 if (pdfsArray.length > 0) {
  dataWithFileURL.pdf = fieldValue.arrayUnion(...pdfsArray);
}
  db.collection("formation")
    .doc(formationId)
    .update(dataWithFileURL)
    .then(() => {
      console.log("Le formation a été mis à jour avec succès");
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour du formationId :", error);
    });
}
    handleCloseModal();
  };

  const getRecentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString();
    let day = currentDate.getDate().toString();
  
    if (month.length === 1) {
      month = '0' + month;
    }
  
    if (day.length === 1) {
      day = '0' + day;
    }
  
    return `${year}-${month}-${day}`;
  };
  

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  const renderModalContent = () => {
    if (type === "modal1") {
      return (
        <>
         <FormControl>
  <FormLabel htmlFor="image">Image</FormLabel>
  <Input id="image" type="file" onChange={(e) => handleFileChange(e, "image")}  />
</FormControl>
          <FormControl>
            <FormLabel htmlFor="titre">Titre</FormLabel>
            <Input type="text" id="titre" name="titre" value={formData.titre || ""}
             onChange={(e) => handleInputChange(e, "titre")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input type="date" id="date" name="date" value={formData.date || ""} onChange={(e) => handleInputChange(e, "date")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="tarife">Tarife</FormLabel>
            <Input type="number" id="tarife" name="tarife" value={formData.tarife || ""} onChange={(e) => handleInputChange(e, "tarife")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" name="description" value={formData.description || ""} onChange={(e) => handleInputChange(e, "description")} />
          </FormControl>
          <FormControl>
    <FormLabel htmlFor="links">Liens</FormLabel>
    <Input type="text" id="links" name="links" value={formData.links || ""}  onChange={(e) => handleInputChange(e, "links")}  />
  </FormControl>
  
  <FormControl>
    
    <FormLabel htmlFor="video">Vidéos</FormLabel>
    <Input type="file" id="video" name="video" multiple  onChange={(e) => handleFileChange(e, "video")}  />
  </FormControl>
        

  <FormControl>
  <FormLabel htmlFor="image">PDF</FormLabel>
  <Input id="pdf" type="file" multiple onChange={(e) => handleFileChange(e, "pdf")} />
</FormControl>
        
        </>
      );
    } else if (type === "modal2") {
      return (
        <>
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select id="type" name="type" value={formData.type || "choix"} 
            onChange={(e) => handleInputChange(e, "type")}>
              <option value="choix">choix</option>
              <option value="gratuit">Gratuit</option>
              <option value="payé">Payé</option>
            </Select>
          </FormControl>
    
          <FormControl>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <Input id="avatar" type="file" onChange={(e) => handleFileChange(e, "avatar")} />
      </FormControl>
    
          <FormControl>
            <FormLabel htmlFor="title">Titre</FormLabel>
            <Input type="text" id="title" name="title" value={formData.title || ""} onChange={(e) => handleInputChange(e, "title")} />
          </FormControl>
    
          <FormControl>
            <FormLabel htmlFor="profession">Profession</FormLabel>
            <Input type="text" id="profession" name="profession" value={formData.profession || ""} onChange={(e) => handleInputChange(e, "profession")} />
          </FormControl>
    
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input type="date" id="date" name="date" min={getCurrentDate()} value={formData.date || ""} onChange={(e) => handleInputChange(e, "date")} />
          </FormControl>
    
          {formData.type !== "gratuit" && (
            <FormControl>
              <FormLabel htmlFor="prix">Prix en dt</FormLabel>
              <Input type="number" id="prix" name="prix" value={formData.prix || ""} onChange={(e) => handleInputChange(e, "prix")} />
            </FormControl>
          )}
     {formData.type !== "gratuit" && (
            <FormControl>
              <FormLabel htmlFor="prixpt">Prix en point</FormLabel>
              <Input type="number" id="prixpt" name="prixpt" value={formData.prixpt || ""} onChange={(e) => handleInputChange(e, "prixpt")} />
            </FormControl>
          )}
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" name="description" value={formData.description || ""} onChange={(e) => handleInputChange(e, "description")} />
          </FormControl>
    
          <FormControl>
            <FormLabel htmlFor="links">Liens</FormLabel>
            <Input type="text" id="links" name="links" value={formData.links || ""} onChange={(e) => handleInputChange(e, "links")} />
          </FormControl>
    
          <FormControl>
            <FormLabel htmlFor="video">Vidéos</FormLabel>
            <Input type="file" multiple id="video" name="video" onChange={(e) => handleFileChange(e, "video")} />
          </FormControl>
    
          <FormControl>
            <FormLabel htmlFor="pdf">PDF</FormLabel>
            <Input id="pdf" multiple type="file" name="pdf" onChange={(e) => handleFileChange(e, "pdf")} />
          </FormControl>
        </>
      );
    } else if (type === "modal3") {
      return (
        <>
          <FormControl>
            <FormLabel htmlFor="stageName">Nom de stage </FormLabel>
            <Input type="text" id="stageName" name="stageName" value={formData.stageName || ""} onChange={(e) => handleInputChange(e, "stageName")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nbreStager">Nombre de Stager</FormLabel>
            <Input type="number" id="nbreStager" name="nbreStager" value={formData.nbreStager || ""} onChange={(e) => handleInputChange(e, "nbreStager")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="responsable">Responsable</FormLabel>
            <Input type="text" id="responsable" name="responsable" value={formData.responsable || ""} onChange={(e) => handleInputChange(e, "responsable")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="environement">Environment</FormLabel>
            <Input type="text" id="environement" name="environement" value={formData.environement || ""} onChange={(e) => handleInputChange(e, "environement")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="profile">Profile</FormLabel>
            <Input type="text" id="profile" name="profile" value={formData.profile || ""} onChange={(e) => handleInputChange(e, "profile")} />
          </FormControl>
          <FormControl>
  <FormLabel htmlFor="date">Date</FormLabel>
  <Input type="date" id="date" name="date" value={formData.date || ""} min={getCurrentDate()} onChange={(e) => handleInputChange(e, "date")} />
</FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" name="description" value={formData.description || ""} onChange={(e) => handleInputChange(e, "description")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mail">E-mail</FormLabel>
            <Input type="email" id="mail" name="mail" value={formData.mail || ""} onChange={(e) => handleInputChange(e, "mail")} />
          </FormControl>
        </>
      );
    }
    else if (type === "modal20") {
      return (
        <>
          <FormControl>
            <FormLabel htmlFor="stageName">Nom de stage </FormLabel>
            <Input type="text" id="stageName" name="stageName" value={formData.stageName } onChange={(e) => handleInputChange(e, "stageName")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="nbreStager">Nombre de Stager</FormLabel>
            <Input type="number" id="nbreStager" name="nbreStager" value={formData.nbreStager } onChange={(e) => handleInputChange(e, "nbreStager")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="responsable">Responsable</FormLabel>
            <Input type="text" id="responsable" name="responsable" value={formData.responsable } onChange={(e) => handleInputChange(e, "responsable")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="environement">Environment</FormLabel>
            <Input type="text" id="environement" name="environement" value={formData.environement } onChange={(e) => handleInputChange(e, "environement")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="profile">Profile</FormLabel>
            <Input type="text" id="profile" name="profile" value={formData.profile } onChange={(e) => handleInputChange(e, "profile")} />
          </FormControl>
          <FormControl>
  <FormLabel htmlFor="date">Date</FormLabel>
  <Input type="date" id="date" name="date" value={formData.date } min={getCurrentDate()} onChange={(e) => handleInputChange(e, "date")} />
</FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" name="description" value={formData.description } onChange={(e) => handleInputChange(e, "description")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="mail">E-mail</FormLabel>
            <Input type="email" id="mail" name="mail" value={formData.mail} onChange={(e) => handleInputChange(e, "mail")} />
          </FormControl>
        </>
      );
    } else if (type === "modal4") {
      return (
        <>
       <FormControl>
  <FormLabel htmlFor="image">Image</FormLabel>
  <Input id="image" type="file" onChange={handleFilesChange} />
</FormControl>
          <FormControl>
            <FormLabel htmlFor="nomBourse">Nom de bourse</FormLabel>
            <Input type="text" id="nomBourse" name="nomBourse" value={formData.nomBourse || ""} onChange={(e) => handleInputChange(e, "nomBourse")}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" name="description" value={formData.description || ""} onChange={(e) => handleInputChange(e, "description")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input type="date" id="date" name="date" min={getCurrentDate()}  value={formData.date || ""} onChange={(e) => handleInputChange(e, "date")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="prix">Prix</FormLabel>
            <Input type="number" id="prix" name="prix" value={formData.prix || ""} onChange={(e) => handleInputChange(e, "prix")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="state">État</FormLabel>
            <Input type="text" id="state" name="state" value={formData.state || ""} onChange={(e) => handleInputChange(e, "state")} />
          </FormControl>
         
        </>
      );
    }else if (type === "modal17") {
      return (
        <>
       <FormControl>
  <FormLabel htmlFor="image">Image</FormLabel>
  <Input id="image" type="file" onChange={handleFilesChange} />
</FormControl>
          <FormControl>
            <FormLabel htmlFor="nomBourse">Nom de bourse</FormLabel>
            <Input type="text" id="nomBourse" name="nomBourse" value={formData.nomBourse } onChange={(e) => handleInputChange(e, "nomBourse")}/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" name="description" value={formData.description } onChange={(e) => handleInputChange(e, "description")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input type="date" id="date" name="date" min={getCurrentDate()}  value={formData.date } onChange={(e) => handleInputChange(e, "date")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="prix">Prix</FormLabel>
            <Input type="number" id="prix" name="prix" value={formData.prix } onChange={(e) => handleInputChange(e, "prix")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="state">État</FormLabel>
            <Input type="text" id="state" name="state" value={formData.state} onChange={(e) => handleInputChange(e, "state")} />
          </FormControl>
         
        </>
      );
    } else if (type === "modal5") {
      return (
        <>
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select id="type" name="type" value={formData.type || "choix"} onChange={(e) => handleInputChange(e, "type")}>
            <option value="choix">choix</option>
  <option value="examen">Examen</option>
  <option value="pfe">PFE</option>
</Select>

          </FormControl>

          {formData.type === "examen" && (
            <>
              <FormControl>
                <FormLabel htmlFor="profname">Nom de Professeur </FormLabel>
                <Input type="text" id="profname" name="profname" value={formData.profname || ""} onChange={(e) => handleInputChange(e, "profname")} />
              </FormControl>
              <FormControl>
  <FormLabel htmlFor="date">Date</FormLabel>
  <Input type="date" id="date" name="date" value={formData.date || ""} onChange={(e) => handleInputChange(e, "date")} max={getRecentDate()} />
</FormControl>
              <FormControl>
                <FormLabel htmlFor="examenname">Nom de examen</FormLabel>
                <Input type="text" id="examenname" name="examenname" value={formData.examenname || ""} onChange={(e) => handleInputChange(e, "examenname")} />
              </FormControl>
            
              <FormControl>
  <FormLabel htmlFor="pdf">PDF</FormLabel>
  <Input id="pdf" type="file"  onChange={handleFilesChange} />
</FormControl>


            </>
          )}
          {formData.type === "pfe" && (
            <>
              <FormControl>
                <FormLabel htmlFor="stagername">Nom de Stager </FormLabel>
                <Input type="text" id="stagername" name="stagername" value={formData.stagername || ""} onChange={(e) => handleInputChange(e, "stagername")} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="presidentdate">President</FormLabel>
                <Input type="text" id="presidentdate" name="presidentdate" value={formData.presidentdate || ""} onChange={(e) => handleInputChange(e, "presidentdate")}   />
              </FormControl>
              <FormControl>
  <FormLabel htmlFor="date">Date</FormLabel>
  <Input type="date" id="date" name="date" value={formData.date || ""} onChange={(e) => handleInputChange(e, "date")} max={getRecentDate()} />
</FormControl>
              <FormControl>
  <FormLabel htmlFor="pdf">PDF</FormLabel>
  <Input id="pdf" type="file"  onChange={handleFilesChange} />
</FormControl>

            </>
          )}
        </>
      );
    }else if (type === "modal15") {
      return (
        <>
           <FormControl>
  <FormLabel htmlFor="etudiant">Etudiant</FormLabel>
  <Select
    placeholder="Sélectionner un Etudiant"
    value={selectedFilters}
    onChange={handleFiltersChange}
    width="200px"
    mr={4}
  >
    {etudiant.map((etudiant) => (
      <option key={etudiant.uid} value={etudiant.cin} data-uid={etudiant.uid}>
        {etudiant.cin}
      </option>
    ))}
  </Select>
</FormControl>

      
          <FormControl>
            <FormLabel htmlFor="semestre">Semestre</FormLabel>
            <Select id="semestre" name="semestre" value={formData.semestre || "choix"} onChange={(e) => handleInputChange(e, "semestre")}>
            <option value="choix">choix</option>
  <option value="s1">semestre 1</option>
  <option value="s2">semestre 2</option>
</Select>

          </FormControl>

         
              <FormControl>
                <FormLabel htmlFor="matiere">Nom de matier</FormLabel>
                <Input type="text" id="matiere" name="matiere" value={formData.matiere || ""} onChange={(e) => handleInputChange(e, "matiere")} />
              </FormControl>
             
              <FormControl>
                <FormLabel htmlFor="noteOral">Note Oral</FormLabel>
                <Input type="text" id="noteOral" name="noteOral" value={formData.noteOral || ""} onChange={(e) => handleInputChange(e, "noteOral")} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="noteDevoirSurveille">note devoir surveille</FormLabel>
                <Input type="text" id="noteDevoirSurveille" name="noteDevoirSurveille" value={formData.noteDevoirSurveille || ""} onChange={(e) => handleInputChange(e, "noteDevoirSurveille")} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="noteExamen">Note examen</FormLabel>
                <Input type="text" id="noteExamen" name="noteExamen" value={formData.noteExamen || ""} onChange={(e) => handleInputChange(e, "noteExamen")} />
              </FormControl>


            </>
       
        
     
      );
    }
    else if (type === "modal6") {
      return (
        <>
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select id="type" name="type" value={formData.type || "choix"}  onChange={(e) => handleInputChange(e, "type")}>
            <option value="choix">choix</option>
            <option value="gratuit">gratuit</option>
  <option value="Point">Point</option>
  <option value="Carte">Carte</option>
</Select>

          </FormControl>

          {formData.type === "Carte" && (
            <>
              <FormControl>
                <FormLabel htmlFor="cartnumber">Numero de carte </FormLabel>
                <Input type="text" id="cartnumber" name="cartnumber" value={formData.cartnumber || ""}  onChange={(e) => handleInputChange(e, "cartnumber")} />
              </FormControl>
            




            </>
          )}
          {formData.type === "Point" && (
            <>
              <FormControl>
                <FormLabel htmlFor="coursnbrs">Tu es sûre</FormLabel>
               
              </FormControl>
             
              

            </>
          )}
        </>
      );
    } else if (type === "modal7") {
      return (
        <>
          <FormControl>
            <FormLabel htmlFor="image">Image</FormLabel>
            <Input id="image" type="file" onChange={(e) => handleFileChange(e, "image")}  />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="titre">Titre</FormLabel>
            <Input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre || (currentCourse && currentCourse.titre) || ""}
              onChange={(e) => handleInputChange(e, "titre")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date || (currentCourse && currentCourse.date) || ""}
              onChange={(e) => handleInputChange(e, "date")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="tarife">Tarife</FormLabel>
            <Input
              type="number"
              id="tarife"
              name="tarife"
              value={formData.tarife || (currentCourse && currentCourse.tarife) || ""}
              onChange={(e) => handleInputChange(e, "tarife")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              name="description"
              value={formData.description || (currentCourse && currentCourse.description) || ""}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </FormControl>
          <FormControl>
    <FormLabel htmlFor="links">Liens</FormLabel>
    <Input type="text" id="links" name="links" value={formData.links || ""}  onChange={(e) => handleInputChange(e, "links")}  />
  </FormControl>
  
  <FormControl>
    
    <FormLabel htmlFor="video">Vidéos</FormLabel>
    <Input type="file" id="video" name="video" multiple  onChange={(e) => handleFileChange(e, "video")}  />
  </FormControl>
        

  <FormControl>
  <FormLabel htmlFor="pdf">PDF</FormLabel>
  <Input id="pdf" type="file" multiple onChange={(e) => handleFileChange(e, "pdf")} />
</FormControl>
        </>
      );
    }
    else if (type === "modal8") {
      return (
        <> 
      <FormControl>
            <FormLabel htmlFor="supprimer">Tu es sûre ? </FormLabel>
           
          </FormControl>
       
        
      </>
      );
    }    else if (type === "modal21") {
      return (
        <> 
      <FormControl>
            <FormLabel htmlFor="supprimer">Tu es sûre ? </FormLabel>
           
          </FormControl>
       
        
      </>
      );
    }  else if (type === "modal18") {
      return (
        <> 
      <FormControl>
            <FormLabel htmlFor="supprimer">Tu es sûre  ? </FormLabel>
           
          </FormControl>
       
        
      </>
      );
    }  else if (type === "modal13") {
      return (
        <> 
      <FormControl>
            <FormLabel htmlFor="supprimer">Tu es sûre ? </FormLabel>
           
          </FormControl>
       
        
      </>
      );
    }else if (type === "modal14") {
      return (
        <>
          <FormControl>
            <FormLabel htmlFor="image">Image</FormLabel>
            <Input id="image" type="file" onChange={(e) => handleFileChange(e, "image")}  />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="titre">Titre</FormLabel>
            <Input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre || (currentCourse && currentCourse.titre) || ""}
              onChange={(e) => handleInputChange(e, "titre")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date || (currentCourse && currentCourse.date) || ""}
              onChange={(e) => handleInputChange(e, "date")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="tarife">Tarife</FormLabel>
            <Input
              type="number"
              id="tarife"
              name="tarife"
              value={formData.tarife || (currentCourse && currentCourse.tarife) || ""}
              onChange={(e) => handleInputChange(e, "tarife")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              name="description"
              value={formData.description || (currentCourse && currentCourse.description) || ""}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </FormControl>
        </>
      );
    }
      else if (type === "modal9") {
        return (
          <> 
            <FormControl>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select
                placeholder="Sélectionner un filtre"
                value={selectedFilter}
                onChange={handleFilterChange}
                
                width="200px"
                mr={4}
              >
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </Select>
            </FormControl>
      
            <FormControl>
              <FormLabel htmlFor="imageURL">Image</FormLabel>
              <Input id="imageURL" type="file" onChange={handleFilesChange}  />
            </FormControl>
          </>
        );
      }else if (type === "modal12") {
        return (
          <>
         <FormControl>
    <FormLabel htmlFor="pdf">pdf</FormLabel>
    <Input id="pdf" type="file" onChange={(e) => handleFileChange(e, "pdf")}  />
  </FormControl>
  <FormControl>
    <FormLabel htmlFor="links">Link</FormLabel>
    <Input id="links" type="file" onChange={(e) => handleInputChange(e, "links")} />
  </FormControl>  
         
          
          
           
          </>
        );
      }
      else if (type === "modal11") {
        return (
          <>
            <FormControl>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select id="type" name="type" value={formData.type || "choix"} onChange={(e) => handleInputChange(e, "type")}>
              <option value="choix">choix</option>
              <option value="noteS1">Semestre1</option>
              <option value="notes2">Semestre2</option>
             </Select>
            </FormControl>
  
            {formData.type === "noteS1" && (
              <>
                <FormControl>
                  <FormLabel htmlFor="profname">Nom de professeur </FormLabel>
                  <Input type="text" id="profname" name="profname" value={formData.profname || ""} onChange={(e) => handleInputChange(e, "profname")}  />
                </FormControl>
                <FormControl>
    <FormLabel htmlFor="date">Date</FormLabel>
    <Input type="date" id="date" name="date" value={formData.date || ""} onChange={(e) => handleInputChange(e, "date")}  max={getRecentDate()} />
  </FormControl>
                <FormControl>
                  <FormLabel htmlFor="examenname">Nom d'examen </FormLabel>
                  <Input type="text" id="examenname" name="examenname" value={formData.examenname || ""}   onChange={(e) => handleInputChange(e, "examenname")}  />
                </FormControl>
              
                <FormControl>
    <FormLabel htmlFor="pdf">PDF</FormLabel>
    <Input id="pdf" type="file"  onChange={(e) => handleFileChange(e, "pdf")}  />
  </FormControl>
  
  
              </>
            )}
            {formData.type === "notes2" && (
              <>
                <FormControl>
                  <FormLabel htmlFor="stagername">Nom de stager </FormLabel>
                  <Input type="text" id="stagername" name="stagername" value={formData.stagername || ""} onChange={(e) => handleInputChange(e, "stagername")}  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="presidentdate">Date</FormLabel>
                  <Input type="date" id="presidentdate" name="presidentdate" value={formData.presidentdate || ""}  onChange={(e) => handleInputChange(e, "presidentdate")}   max={getRecentDate()} />
                </FormControl>
                <FormControl>
    <FormLabel htmlFor="pdf">PDF</FormLabel>
    <Input type="file" id="pdf" name="file" accept=".pdf" onChange={(e) => handleFileChange(e, "pdf")}  />
  </FormControl>
  
              </>
            )}
          </>
        );
      }  else if (type === "modal16") {
        return (
          <> 
         <FormControl>
          <FormLabel htmlFor="titre">Nombre de compte</FormLabel>
          <Input
            type="text"
            id="nbrCommpte"
            name="nbrCommpte"
            value={formData.nbrCommpte ||""}
            onChange={(e) => handleInputChange(e, "nbrCommpte")}
          />
        </FormControl>
         
          
        </>
        );
      
    }
    else if (type === "modal10") {
      return (<>
       <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select id="type" name="type" value={formData.type || "choix"}  onChange={(e) => handleInputChange(e, "type")}>
            <option value="choix">choix</option>
            <option value="pack1">pack1</option>
  <option value="pack2">pack2</option>
  <option value="pack3">pack3</option>
</Select>

          </FormControl>
          {formData.type === "pack1" && (
          <>
        <FormControl>
        <FormLabel htmlFor="titre">Nombre de compte</FormLabel>
        <Input
          type="text"
          id="nbrCommpte"
          name="nbrCommpte"
          value={formData.nbrCommpte ||""}
          onChange={(e) => handleInputChange(e, "nbrCommpte")}
        />
      </FormControl>
      <FormControl>
<FormLabel htmlFor="nbrCours">Nombre de cours</FormLabel>
<Input
  type="text"
  id="nbrCours"
  name="nbrCours"
  value={formData.nbrCours ||""}
  onChange={(e) => handleInputChange(e, "nbrCours")}
/>
</FormControl>
<FormControl>
<FormLabel htmlFor="nbrFormation">Nombre de formation</FormLabel>
<Input
  type="text"
  id="nbrFormation"
  name="nbrFormation"
  value={formData.nbrFormation ||""}
  onChange={(e) => handleInputChange(e, "nbrFormation")}
/>
</FormControl>

</>)}
          {formData.type === "pack3" && (
          <>
        <FormControl>
        <FormLabel htmlFor="titre">Nombre de compte</FormLabel>
        <Input
          type="text"
          id="nbrCommpte"
          name="nbrCommpte"
          value={formData.nbrCommpte ||""}
          onChange={(e) => handleInputChange(e, "nbrCommpte")}
        />
      </FormControl>
      <FormControl>
<FormLabel htmlFor="nbrCours">Nombre de cours</FormLabel>
<Input
  type="text"
  id="nbrCours"
  name="nbrCours"
  value={formData.nbrCours ||""}
  onChange={(e) => handleInputChange(e, "nbrCours")}
/>
</FormControl>
<FormControl>
<FormLabel htmlFor="nbrFormation">Nombre de formation</FormLabel>
<Input
  type="text"
  id="nbrFormation"
  name="nbrFormation"
  value={formData.nbrFormation ||""}
  onChange={(e) => handleInputChange(e, "nbrFormation")}
/>
</FormControl>
<FormControl>
<FormLabel htmlFor="nbrStage">Nombre de stage</FormLabel>
<Input
  type="text"
  id="nbrStage"
  name="nbrStage"
  value={formData.nbrStage ||""}
  onChange={(e) => handleInputChange(e, "nbrStage")}
/>
</FormControl>
<FormControl>
<FormLabel htmlFor="nbrBourse">Nombre de bourse</FormLabel>
<Input
  type="text"
  id="nbrBourse"
  name="nbrBourse"
  value={formData.nbrBourse ||""}
  onChange={(e) => handleInputChange(e, "nbrBourse")}
/>
</FormControl></>)}
{formData.type === "pack2" && (
          <>
        <FormControl>
        <FormLabel htmlFor="titre">Nombre de compte</FormLabel>
        <Input
          type="text"
          id="nbrCommpte"
          name="nbrCommpte"
          value={formData.nbrCommpte ||""}
          onChange={(e) => handleInputChange(e, "nbrCommpte")}
        />
      </FormControl>
      <FormControl>
<FormLabel htmlFor="nbrCours">Nombre de cours</FormLabel>
<Input
  type="text"
  id="nbrCours"
  name="nbrCours"
  value={formData.nbrCours ||""}
  onChange={(e) => handleInputChange(e, "nbrCours")}
/>
</FormControl>
<FormControl>
<FormLabel htmlFor="nbrFormation">Nombre de formation</FormLabel>
<Input
  type="text"
  id="nbrFormation"
  name="nbrFormation"
  value={formData.nbrFormation ||""}
  onChange={(e) => handleInputChange(e, "nbrFormation")}
/>
</FormControl>
<FormControl>
<FormLabel htmlFor="nbrStage">Nombre de stage</FormLabel>
<Input
  type="text"
  id="nbrStage"
  name="nbrStage"
  value={formData.nbrStage ||""}
  onChange={(e) => handleInputChange(e, "nbrStage")}
/>
</FormControl>
</>)}</>
      );
    }
  };

  return (
    <>
    <Button p={4} height={"100%"}
  onClick={handleOpenModal}
  colorScheme={label === "supprimer" ? "red" : label === "modifier" ? "orange" : "blue"}
  mr={3}
  size="md"
>
  {label}
</Button>


    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{label}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {renderModalContent()}
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} size="md">
                Submit
              </Button>
              <Button onClick={handleCloseModal} colorScheme="gray" size="md">
                Enregistrer
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  );
};

export default ButtonWidget;
 