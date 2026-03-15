import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POSTBASE_TOKEN } from '../../utils/tokens/PostBaseToken';
import { EditorContainerService } from '../../services/editor-container-service/editor-container-service';
import { Editor } from '../../shared/editor/editor';
import { NameService } from '../../services/name-service/name-service';

@Component({
  selector: 'app-editor-container',
  imports: [Editor],
  providers: [
    {
      provide: POSTBASE_TOKEN,
      useFactory: (
        editorContainer: EditorContainer,
        editorContainerService: EditorContainerService,
      ) => editorContainerService.serviceReturn(editorContainer),
      deps: [EditorContainer, EditorContainerService],
    },
  ],
  templateUrl: './editor-container.html',
  styleUrl: './editor-container.scss',
})
export class EditorContainer {
  param = signal<string>('init');
  collectionId = signal<number>(0);
  postId = signal<number>(0);
  updateMode = signal<boolean>(false);
  protected loggedIn = computed(() => {
    if (this.name.loggedIn() === true) return true;
    return false;
  });

  constructor(
    route: ActivatedRoute,
    private name: NameService,
  ) {
    const editorMode = route.snapshot.paramMap.get('editormode') ?? '';
    const collectionIdParam = route.snapshot.paramMap.get('collectionid') ?? '';
    const postIdParam = route.snapshot.paramMap.get('postid') ?? '';
    const updateParam = route.snapshot.paramMap.get('update') ?? '';

    const collectionId = parseInt(collectionIdParam);
    const postId = parseInt(postIdParam);

    this.collectionId.set(collectionId);
    this.postId.set(postId);
    this.param.set(editorMode);
    if (updateParam === 'update') this.updateMode.set(true);
  }
}
