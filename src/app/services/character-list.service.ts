import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, getDocs, query, where, doc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CharacterListService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async getFavorites(): Promise<any[]> {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    const favoritesRef = collection(this.firestore, 'favoritos');
    const q = query(favoritesRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }

  async addFavorite(character: any): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const favoritosRef = collection(this.firestore, 'favoritos');
    await addDoc(favoritosRef, {
      ...character,
      uid: user.uid
    });
  }

  async removeFavorite(character: any): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const favoritosRef = collection(this.firestore, 'favoritos');
    const q = query(favoritosRef, where('uid', '==', user.uid), where('id', '==', character.id));
    const snapshot = await getDocs(q);
    for (const docSnap of snapshot.docs) {
      await deleteDoc(doc(this.firestore, 'favoritos', docSnap.id));
    }
  }
}
